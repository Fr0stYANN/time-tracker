using System.Runtime.CompilerServices;
using System.Text;
using AutoMapper;
using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Dapper.Transaction;
using DapperQueryBuilder;
using Microsoft.Extensions.Configuration;
using Server.MSSQL.Mapper;
using Server.MSSQL.Models;
using Server.MSSQL.Utilities;
using static Server.MSSQL.Utilities.FormatUtilities;

namespace Server.MSSQL.Repositories;

public class UserRepository : IUserRepository
{
    private readonly string connectionString;
    private readonly IMapper mapper;

    public UserRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSql");
        mapper = new MapperSetup().Mapper;
    }

    public int Create(UserModel userModel)
    {
        const string insertUserQuery = @"
            INSERT INTO Users       
            (
                Email, 
                Firstname, 
                Lastname, 
                Password,
                VacationDays,
                EmploymentDate,
                WorkTypeId
            ) 
            OUTPUT INSERTED.Id 
            VALUES(
                @Email,
                @Firstname, 
                @Lastname, 
                @Password,
                30,
                @EmploymentDate,  
                @WorkTypeId
            )
        ";

        const string insertOptionsUsersQuery = @"
            INSERT INTO OptionsUsers
            (UserId, OptionId)
            VALUES (@UserId, @OptionId)
        ";

        const string insertApproveVacationUserQuery = @"
            INSERT INTO ApproveVacationUser
            (UserId, ApproverId)
            VALUES (@UserId, @ApproverId)    
        ";

        var userDbModel = mapper.Map<UserDbModel>(userModel);

        List<int> approversIds = new List<int>();
        if (userModel.VacationApprovers.Count != 0)
        {
            approversIds = GetApproversIds(userModel.VacationApprovers); // WARNING: Dont replace this line under
                                                                        // transaction because of QueryBuilder,
                                                                        // same in Update method
        }
        
        using var connection = new SqlConnection(connectionString);
        connection.Open();

        using var transaction = connection.BeginTransaction();

        try
        {
            var createdUserId = transaction.ExecuteScalar<int>(insertUserQuery, userDbModel);

            if (userModel.Options != null && userModel.Options.Count != 0)
            {
                var optionsUserDbModels =
                    mapper.Map<List<OptionsUsersDbModel>>(
                        userModel.Options,
                        opt => opt.Items["UserId"] = createdUserId
                    );

                transaction.Execute(insertOptionsUsersQuery, optionsUserDbModels);
            }

            if (approversIds.Count != 0)
            {
                var approveVacationUserModels = GetApproveVacationUserModels(approversIds, createdUserId);
                transaction.Execute(insertApproveVacationUserQuery, approveVacationUserModels);
            }
            
            transaction.Commit();
            return createdUserId;
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    public void SetActivationStatus(int id, bool isActivated)
    {
        string query = @"
            UPDATE Users
            SET IsActivated = @IsActivated
            WHERE Id = @Id
         ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new {Id = id, IsActivated = isActivated});
    }

    public UserModel? GetByEmail(string email)
    {
        const string query = @"
            SELECT 
	            U.*, W.*, O.*
            FROM Users U
            LEFT JOIN WorkTypes W ON (W.Id = U.WorkTypeId)
            LEFT JOIN OptionsUsers OU ON (OU.UserId = U.Id)
            LEFT JOIN Options O ON (O.Id = OU.OptionId)
            WHERE U.Email = @Email
        ";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryUsers(query, new {Email = email}).SingleOrDefault();
    }

    public UserModel? GetById(int id)
    {
        const string query = @"
            SELECT 
	            U.*, W.*, O.*
            FROM Users U
            LEFT JOIN WorkTypes W ON (W.Id = U.WorkTypeId)
            LEFT JOIN OptionsUsers OU ON (OU.UserId = U.Id)
            LEFT JOIN Options O ON (O.Id = OU.OptionId)
            WHERE U.Id = @Id
        ";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryUsers(query, new {Id = id}).SingleOrDefault();
    }

    public IEnumerable<UserModel> GetAll(
        out int numRecordsUsers, 
        PaginationModel? paginationModel = null, 
        List<SortModel>? sortModels = null,
        List<FilterModel>? filterModels = null,
        SearchModel? searchModel = null
    )
    {
        using var connection = new SqlConnection(connectionString);

        FormattableString paginationSql;
        FormattableString sortSql;

        if (paginationModel != null)
        {
            paginationSql = $@"
                ORDER BY Firstname
                OFFSET {paginationModel.Offset} ROWS
                FETCH NEXT {paginationModel.Next} ROWS ONLY   
            ";
        }
        else
        {
            paginationSql = $"";
        }

        if (sortModels != null && sortModels.Any())
        {
            sortSql = GetUserFormatSort(sortModels);
        }
        else
        {
            sortSql = $"ORDER BY Firstname ASC";
        }

        var usersQueryBuilder = connection.QueryBuilder($@"
            SELECT 
                U.*, W.*, O.*
            FROM (
                SELECT * FROM Users
                /**where**/
                {paginationSql}
            ) as U
            LEFT JOIN WorkTypes W ON (W.Id = U.WorkTypeId)
            LEFT JOIN OptionsUsers OU ON (OU.UserId = U.Id)
            LEFT JOIN Options O ON (O.Id = OU.OptionId)
            {sortSql}
        ");

        var numRecordsQueryBuilder = connection.QueryBuilder($@"
            SELECT COUNT(*) as UsersRecords 
            FROM Users
            /**where**/
        ");

        if (filterModels != null && filterModels.Any())
        {
            usersQueryBuilder.Where(GetFormatFilters(filterModels));
            numRecordsQueryBuilder.Where(GetFormatFilters(filterModels));
        }

        if (searchModel != null)
        {
            usersQueryBuilder.Where(GetUserFormatSearch(searchModel));
            numRecordsQueryBuilder.Where(GetUserFormatSearch(searchModel));
        }

        numRecordsUsers = numRecordsQueryBuilder.Query<int>().Single();

        return connection.QueryUsers(usersQueryBuilder.Sql, usersQueryBuilder.Parameters).ToList();
    }

    public void Update(UserModel userModel)
    {
        const string queryUpdateUser = @"
            UPDATE Users 
            SET 
                Email = @Email, 
                Firstname = @Firstname,
                Lastname = @Lastname, 
                Password = @Password, 
                VacationDays = @VacationDays, 
                EmploymentDate = @EmploymentDate,
                WorkTypeId = @WorkTypeId
            WHERE Id = @Id
        ";

        const string queryUpdateOptionsUsers = @"
            IF NOT EXISTS (SELECT * FROM OptionsUsers WHERE UserId = @UserId AND OptionId = @OptionId)
            BEGIN
                INSERT INTO OptionsUsers
                (UserId, OptionId)
                VALUES (@UserId, @OptionId)
            END
        ";

        const string queryUpdateApproveVacationUser = @"
            INSERT INTO ApproveVacationUser
            (UserId, ApproverId)
            VALUES (@UserId, @ApproverId)   
        ";

        const string queryOptionsUsers = @"
            SELECT * FROM OptionsUsers
            WHERE UserId = @UserId
        ";

        const string queryDeleteOptionsUsers = @"
            DELETE FROM OptionsUsers
            WHERE UserId = @UserId AND @OptionId = OptionId
        ";

        const string queryDeleteApproveVacationUser = @"
            DELETE FROM ApproveVacationUser 
            WHERE UserId = @UserId AND ApproverId = @ApproverId";
        
        List<ApproveVacationUserModel> approveVacationsUserModels = new List<ApproveVacationUserModel>();
        
        if (userModel.VacationApprovers.Count != 0)
        {
            var approversIds = GetApproversIds(userModel.VacationApprovers);
            approveVacationsUserModels = GetApproveVacationUserModels(approversIds, userModel.Id);
        }
        
        var existsApproveVacationUserForDelete = GetExistingApproveVacationUser(userModel.Id);

        var userDbModel = mapper.Map<UserDbModel>(userModel);

        using var connection = new SqlConnection(connectionString);
        connection.Open();

        using var transaction = connection.BeginTransaction();

        var existsOptionsUserForDelete =
            transaction.Query<OptionsUsersDbModel>(queryOptionsUsers, new {UserId = userModel.Id}).ToList();

        try
        {
            transaction.Execute(queryUpdateUser, userDbModel);

            if (userModel.Options != null && userModel.Options.Count != 0)
            {
                foreach (var option in userModel.Options)
                {
                    existsOptionsUserForDelete.RemoveAll(opt => opt.OptionId == option.Id);
                }

                var optionsUserDbModels =
                    mapper.Map<List<OptionsUsersDbModel>>(userModel.Options,
                        opt => { opt.Items["UserId"] = userModel.Id; });

                transaction.Execute(queryUpdateOptionsUsers, optionsUserDbModels);
            }

            transaction.Execute(queryDeleteApproveVacationUser, existsApproveVacationUserForDelete);
            
            if (userModel.VacationApprovers.Count != 0)
            {
                transaction.Execute(queryUpdateApproveVacationUser, approveVacationsUserModels);
            }

            transaction.Execute(queryDeleteOptionsUsers, existsOptionsUserForDelete);

            transaction.Commit();
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    private List<ApproveVacationUserModel> GetExistingApproveVacationUser(int userId)
    {
        const string query = @"
            SELECT * FROM ApproveVacationUser 
            WHERE UserId = @UserId";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<ApproveVacationUserModel>(query, new {UserId = userId}).ToList();
    }

    public List<int> GetApproversIds(List<string> approversEmails)
    {
        using var connection = new SqlConnection(connectionString);

        var query = connection.QueryBuilder($@"
            SELECT Id FROM Users
            /**where**/"
        );

        var filters = new Filters(Filters.FiltersType.OR);

        foreach (string email in approversEmails)
        {
            var formatString = FormattableStringFactory.Create("Email = {0}", email);
            filters.Add(new Filter(formatString));
        }

        query.Where(filters);

        return connection.Query<int>(query.Sql, query.Parameters).ToList();
    }

    private List<ApproveVacationUserModel> GetApproveVacationUserModels(List<int> approversIds, int userId)
    {
        List<ApproveVacationUserModel> approveVacationUserModels = new List<ApproveVacationUserModel>();

        foreach (int approverId in approversIds)
        {
            approveVacationUserModels.Add(
                new ApproveVacationUserModel()
                {
                    UserId = userId,
                    ApproverId = approverId
                }
            );
        }

        return approveVacationUserModels;
    }
}