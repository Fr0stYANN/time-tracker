using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Server.MSSQL.Repositories;

public class SickLeaveRepository : ISickLeaveRepository
{
    private readonly string connectionString;

    public SickLeaveRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSql");
    }

    public SickLeaveModel? GetById(int id)
    {
        string query = @"
                SELECT * FROM SickLeaves 
                WHERE Id = @Id
            ";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryFirstOrDefault<SickLeaveModel>(query, new {Id = id});
    }

    public SickLeaveModel? GetByUserIdAndDate(int userId, DateTime date)
    {
        string query = @"
            SELECT * FROM SickLeaves 
            WHERE UserId = @UserId AND @Date BETWEEN StartDate AND EndDate
        ";

        using var connection = new SqlConnection(connectionString);
        return connection.QueryFirstOrDefault<SickLeaveModel>(query, new {UserId = userId, Date = date});
    }

    public IEnumerable<SickLeaveModel> GetAllByUserId(int userId)
    {
        string query = @"
                SELECT * FROM SickLeaves
                WHERE UserId = @UserId
            ";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<SickLeaveModel>(query, new {UserId = userId});
    }

    public int Create(SickLeaveModel sickLeaveModel)
    {
        string query = @"
                INSERT INTO SickLeaves       
                (StartDate, EndDate, UserId) 
                OUTPUT INSERTED.Id 
                VALUES(@StartDate, @EndDate, @UserId)
            ";

        using var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<int>(query, sickLeaveModel);
    }

    public void Delete(int id)
    {
        string query = @"
                DELETE FROM SickLeaves 
                WHERE Id = @Id
            ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new {Id = id});
    }

    public void Update(SickLeaveModel sickLeaveModel)
    {
        string query = @"
                UPDATE SickLeaves 
                SET StartDate = @StartDate, EndDate = @EndDate
                WHERE Id = @Id";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, sickLeaveModel);
    }
}