using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;

namespace Server.MSSQL.Repositories;

public class TimeTrackTypeRepository : ITimeTrackTypeRepository
{
    private readonly string connectionString;
    public TimeTrackTypeRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("MsSql");
    }
    public List<TimeTrackTypeModel> GetAll()
    {
        string query = @"SELECT * FROM TimeTrackTypes";
        
        using var connection = new SqlConnection(connectionString);
        var timeTrackTypes = connection.Query<TimeTrackTypeModel>(query);

        return timeTrackTypes.ToList();
    }

    public TimeTrackTypeModel GetById(int id)
    {
        string query = @"SELECT * FROM TimeTrackTypes
                         WHERE Id = @Id";
        
        using var connection = new SqlConnection(connectionString);
        
        return connection.QueryFirstOrDefault<TimeTrackTypeModel>(query, new { Id = id });
    }
}