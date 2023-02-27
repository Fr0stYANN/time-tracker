using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.MSSQL.Repositories
{
    public class TimeTrackUpdateHistoryRepository : ITimeTrackUpdateHistoryRepository
    {
        private readonly string connectionString;
        
        public TimeTrackUpdateHistoryRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
        }
        
        public void Add(int? updatorId, int timeTrackId, DateTime date)
        {
            string query = @"INSERT INTO TimeTracksUpdateHistory
                             (UpdatorId, TimeTrackId, Date)
                             VALUES(@UpdatorId, @TimeTrackId, @Date)";

            var variables = new
            {
                UpdatorId = updatorId,
                TimeTrackId = timeTrackId,
                Date = date
            };
            
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, variables);
        }
        
        public TimeTrackUpdateHistoryModel? GetByTimeTrackId(int id)
        {
            string query = @"SELECT * FROM TimeTracksUpdateHistory
                             WHERE TimeTrackId = @TimeTrackId";

            using var connection = new SqlConnection(connectionString);
            return connection.QueryFirstOrDefault<TimeTrackUpdateHistoryModel>(query, new { TimeTrackId = id });
        }
        
        public void Update(int updateHistoryId, int updatorId, int timeTrackId, DateTime date)
        {
            string query = @"UPDATE TimeTracksUpdateHistory
                            SET
                            TimeTrackId = @TimeTrackId, UpdatorId = @UpdatorId, Date = @Date
                            WHERE Id = @Id";

            var variables = new
            {
                TimeTrackId = timeTrackId,
                Id = updateHistoryId,
                UpdatorId = updatorId,
                Date = date
            };
            
            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, variables);
        }
    }
}
