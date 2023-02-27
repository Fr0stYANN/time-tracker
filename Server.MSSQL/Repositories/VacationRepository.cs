using AutoMapper;
using Dapper;
using Dapper.Transaction;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.MSSQL.Mapper;
using Server.MSSQL.Models;
using Server.MSSQL.Utilities;

namespace Server.MSSQL.Repositories;

public class VacationRepository : IVacationRepository
{
    private readonly string connectionString;
    private readonly IMapper mapper;

    public VacationRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSQL");
        mapper = new MapperSetup().Mapper;
    }
    
    public List<VacationModel> GetNeedsToApprove(int approverId)
    {
        const string query = @"
            SELECT
                V.*, AV.*, AU.*, U.*
            FROM Vacations V
            LEFT JOIN ApproveVacation AV ON (AV.VacationId = V.Id)
            LEFT JOIN Users AU ON (AV.ApproverId = AU.Id)
            LEFT JOIN Users U ON (V.UserId = U.Id)
            WHERE AV.ApproverId = @ApproverId AND AV.IsApproved IS NULL";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryUserVacations(query, new {ApproverId = approverId});
    }

    public List<VacationModel> GetByUserId(int id)
    {
        const string query = @"
            SELECT
                V.*, AV.*, AU.*, U.*
            FROM Vacations V
            LEFT JOIN ApproveVacation AV ON (AV.VacationId = V.Id)
            LEFT JOIN Users AU ON (AV.ApproverId = AU.Id)
            LEFT JOIN Users U ON (V.UserId = U.Id)
            WHERE V.UserId = @UserId";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryUserVacations(query, new { UserId = id });
    }

    public void DeleteById(int id)
    {
        string query = @"
            DELETE FROM Vacations
            WHERE Id = @Id";
        
        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new { Id = id });
    }
    
    public VacationModel GetById(int id)
    {
        const string query = @"
            SELECT
                V.*, AV.*, AU.*, U.*
            FROM Vacations V
            LEFT JOIN ApproveVacation AV ON (AV.VacationId = V.Id)
            LEFT JOIN Users AU ON (AV.ApproverId = AU.Id)
            LEFT JOIN Users U ON (V.UserId = U.Id)
            WHERE V.Id = @Id";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryUserVacations(query, new { Id = id }).SingleOrDefault()!;
    }
    
    public VacationModel? GetByUserIdAndDate(int userId, DateTime date)
    {
        const string query = @"
            SELECT *
            FROM Vacations
            WHERE UserId = @UserId AND @Date BETWEEN StartDate AND EndDate";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<VacationModel>(query, new { UserId = userId, Date = date }).FirstOrDefault();
    }

    public List<UserModel> GetUserApprovers(int userId)
    {
        const string query = @"
            SELECT 
                U.*
            FROM ApproveVacationUser APV
            LEFT JOIN Users U ON (APV.ApproverId = U.Id)
            WHERE APV.UserId = @UserId";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<UserModel>(query, new { UserId = userId }).ToList();
    }
    
    public int Create(VacationModel vacationModel, TimeSpan vacationDays)
    {
        const string insertVacationQuery = @"
            INSERT INTO Vacations (UserId, StartDate, EndDate, Comment, IsApproved)
            OUTPUT INSERTED.Id
            VALUES (@UserId, @StartDate, @EndDate, @Comment, @IsApproved)";

        const string insertApproveVacationsQuery = @"
            INSERT INTO ApproveVacation (VacationId, ApproverId, IsApproved, Comment)
            VALUES (@VacationId, @ApproverId, @IsApproved, NULL)";

        const string insertNewVacationDays = @"
            UPDATE Users
            SET VacationDays = VacationDays - @VacationDays
            WHERE Id = @Id";

        var vacationDbModel = mapper.Map<VacationDbModel>(vacationModel);
        
        using var connection = new SqlConnection(connectionString);
        connection.Open();

        using var transaction = connection.BeginTransaction();

        try
        {
            var vacationId = transaction.ExecuteScalar<int>(insertVacationQuery, vacationDbModel);
            var approveVacations = GetApproveVacationModels(vacationModel.User.Id, vacationId);
            
            transaction.Execute(insertApproveVacationsQuery, approveVacations);
            transaction.Commit();

            return vacationId;
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

    public void Update(VacationModel vacationModel)
    {
        string query = @"
            UPDATE VACATIONS
             SET 
                UserId = @UserId, 
                StartDate = @StartDate, 
                EndDate = @EndDate, 
                Comment = @Comment
             WHERE Id = @Id";

        var vacationDbModel = mapper.Map<VacationDbModel>(vacationModel);
        
        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, vacationDbModel);
    }

    public void ApproveVacationRecord(int vacationRecordId, string? comment)
    {
        const string query = @"
            UPDATE ApproveVacation
            SET IsApproved = 1, Comment = @Comment
            OUTPUT INSERTED.VacationId
            WHERE Id = @Id";

        var parameters = new
        {
            Id = vacationRecordId,
            Comment = comment
        };
        
        int vacationId;
        using (var connection = new SqlConnection(connectionString))
        {
            vacationId = connection.ExecuteScalar<int>(query, parameters);
        }

        if (IsAllVacationRecordsApproved(vacationId))
        {
            ApproveVacation(vacationId);
            
            var vacation = GetById(vacationId);
            var vacationTimeSpan = vacation.EndDate - vacation.StartDate;

            var currentVacationDays = GetCurrentUserVocationDays(vacation.User.Id);
            
            if (currentVacationDays == 0) return;

            if (currentVacationDays <= vacationTimeSpan.Days)
            {
                SetVacationDaysForUser(vacation.User.Id, -currentVacationDays);
                return;
            }
            
            SetVacationDaysForUser(vacation.User.Id, -vacationTimeSpan.Days);
        }
    }

    public void DeclineVacationRecord(int vacationRecordId, string? comment)
    {
        const string query = @"
            UPDATE ApproveVacation
            SET IsApproved = 0, Comment = @Comment
            OUTPUT INSERTED.VacationId
            WHERE Id = @Id
        ";
        
        var parameters = new
        {
            Id = vacationRecordId,
            Comment = comment
        };
        
        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, parameters);
    }

    public void SetVacationDaysForUser(int userId, int days)
    {
        const string query = @"
            UPDATE USERS
            SET VacationDays = VacationDays + @VacationDays
            WHERE Id = @Id";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new { Id = userId, VacationDays = days });
    }

    public int GetCurrentUserVocationDays(int userId)
    {
        const string query = @"
            SELECT VacationDays FROM Users
            WHERE Id = @Id";

        using var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<int>(query, new { Id = userId });
    }

    private bool IsAllVacationRecordsApproved(int vacationId)
    {
        const string query = @"
            SELECT IsApproved FROM ApproveVacation
            WHERE VacationId = @VacationId";

        using var connection = new SqlConnection(connectionString);
        var isApproveRecords = connection.Query<bool?>(query, new { VacationId = vacationId }).ToList();

        return !isApproveRecords.Contains(false) && !isApproveRecords.Contains(null);
    }
    
    private void ApproveVacation(int vacationId)
    {
        const string query = @"
            UPDATE Vacations
            SET IsApproved = 1
            WHERE Id = @Id";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new { Id = vacationId });
    }
    
    private List<int> GetVacationApproversIds(int userId)
    {
        const string query = @"
            SELECT ApproverId FROM ApproveVacationUser
            WHERE UserId = @UserId";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<int>(query, new { UserId = userId }).ToList();
    }

    private List<ApproveVacationDbModel> GetApproveVacationModels(int userId, int vacationId)
    {
        List<ApproveVacationDbModel> approveVacations = new List<ApproveVacationDbModel>();
        
        var vacationApproversIds = GetVacationApproversIds(userId);

        foreach (var approverId in vacationApproversIds!)
        {
            approveVacations.Add(new ApproveVacationDbModel()
                {
                    VacationId = vacationId,
                    ApproverId = approverId,
                    IsApproved = null
                });
        }

        return approveVacations;
    }
}