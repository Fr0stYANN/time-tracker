using Server.Business.Interfaces;
using Server.Business.Entities;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Server.MSSQL.Repositories;

public class DayTypeRepository : IDayTypeRepository
{
    private readonly string connectionString;
    public DayTypeRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSql");
    }
    public List<DayTypeModel> GetAll()
    {
        string query = @"SELECT * FROM DayTypes";

        using var connection = new SqlConnection(connectionString);

        var result = connection.Query<DayTypeModel>(query);

        return result.ToList();
    }
    public DayTypeModel GetById(int id)
    {
        string query = @"SELECT * FROM DayTypes
                         WHERE Id = @Id";

        using var connection = new SqlConnection(connectionString);

        return connection.QueryFirstOrDefault<DayTypeModel>(query, new { Id = id });
    }
}