using AutoMapper;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.MSSQL.Mapper;
using Server.MSSQL.Models;

namespace Server.MSSQL.Repositories;

public class ScheduledExecuteRepository : IScheduledExecuteRepository
{
    private readonly IMapper mapper;
    private readonly string connectionString;

    public ScheduledExecuteRepository(IConfiguration configuration)
    {
        mapper = new MapperSetup().Mapper;
        connectionString = configuration.GetConnectionString("MsSql");
    }
    
    public DateTime? GetDateByName(string name)
    {
        const string query = @"
            SELECT Date FROM ScheduleExecution
            WHERE Name = @Name
        ";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<DateTime?>(query, new {Name = name}).FirstOrDefault();
    }

    public void UpdateDateByName(string name, DateTime date)
    {
        const string query = @"
            UPDATE ScheduleExecution
            SET Date = @Date
            WHERE Name = @Name
        ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new {Name = name, Date = date});
    }

    public void ClearDateByName(string name)
    {
        const string query = @"
            UPDATE ScheduleExecution
            SET Date = NULL
            WHERE Name = @Name
        ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new {Name = name});
    }

    public void Insert(string name, DateTime? date)
    {
        const string query = @"
            INSERT INTO ScheduleExecution
            (Name, Date) VALUES (@Name, @Date)
        ";

        using var connection = new SqlConnection(connectionString);
        connection.Execute(query, new {Name = name, Date = date});
    }
}