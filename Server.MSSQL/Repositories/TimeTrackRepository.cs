using AutoMapper;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.MSSQL.Mapper;
using Server.MSSQL.Models;


namespace Server.MSSQL.Repositories
{
    public class TimeTrackRepository : ITimeTrackRepository
    {
        private readonly string connectionString;
        private readonly IMapper mapper;

        public TimeTrackRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
            mapper = new MapperSetup().Mapper;
        }

        public string CommonTimeTrackQueryString = @"
            SELECT 
                T.Id,
                T.StartDate,
                T.EndDate,
                T.TotalTime,
                T.UserId,
                T.TimeTrackTypeId,
                T.CreationTypeId,
                TT.Id,
                TT.Name,
                CT.Id,
                CT.Name,
                TU.Id,
                TU.TimeTrackId,
                TU.UpdatorId,
                TU.Date,
                U.*
            FROM TimeTracks T
            LEFT JOIN TimeTrackTypes TT ON T.TimeTrackTypeId = TT.Id
            LEFT JOIN CreationTypes CT ON CT.Id = T.CreationTypeId
            LEFT JOIN TimeTracksUpdateHistory TU ON TU.TimeTrackId = T.Id
            LEFT JOIN Users U ON TU.UpdatorId = U.Id";

        public int Start(TimeTrackModel timeTrackModel)
        {
            const string query = @"
                INSERT INTO TimeTracks
                (StartDate, EndDate, UserId, TotalTime, TimeTrackTypeId, CreationTypeId)
                OUTPUT Inserted.Id
                VALUES(@StartDate, @EndDate, @UserId, @TotalTime, @TimeTrackTypeId, @CreationTypeId)
            ";

            var timeTrackDbModel = mapper.Map<TimeTrackDbModel>(timeTrackModel);

            using var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, timeTrackDbModel);
        }

        public void Stop(TimeTrackModel timeTrackModel)
        {
            const string query = @"
                UPDATE TimeTracks
                SET
                    UserId = @UserId, StartDate = @StartDate,
                    EndDate = @EndDate, TotalTime = @TotalTime,
                    TimeTrackTypeId = @TimeTrackTypeId,
                    CreationTypeId = @CreationTypeId
                WHERE Id = @Id
            ";

            var timeTrackDbModel = mapper.Map<TimeTrackDbModel>(timeTrackModel);

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, timeTrackDbModel);
        }

        public TimeTrackModel GetById(int id)
        {
            string query = CommonTimeTrackQueryString + " " + "WHERE T.Id = @Id";

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, new {Id = id}).FirstOrDefault()!;
        }

        public TimeTrackModel GetLastByUserId(int userId)
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.UserId = @UserId
                                                                AND T.EndDate IS NULL
                                                                ORDER BY T.StartDate DESC";

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, new {UserId = userId}).FirstOrDefault()!;
        }

        public List<TimeTrackModel> GetListByUserId(int userId)
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.UserId = @UserId AND T.EndDate IS NOT NULL
                                                                ORDER BY T.StartDate DESC";

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, new {UserId = userId}).ToList();
        }

        public List<TimeTrackModel> GetAll()
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.EndDate IS NOT NULL ORDER BY T.StartDate DESC";

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, null).ToList();
        }

        public void Update(TimeTrackModel timeTrackModel)
        {
            string query = @"
                UPDATE TimeTracks
                SET 
                    StartDate = @StartDate,
                    EndDate = @EndDate, 
                    TotalTime = @TotalTime,
                    TimeTrackTypeId = @TimeTrackTypeId
                WHERE Id = @Id";

            var timeTrackDbModel = mapper.Map<TimeTrackDbModel>(timeTrackModel);

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, timeTrackDbModel);
        }

        public List<TimeTrackModel> GetByDateRange(DateTime startDate, DateTime endDate)
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.StartDate BETWEEN @StartDate AND @EndDate
                                                               ORDER BY T.StartDate DESC";

            var variables = new
            {
                StartDate = startDate,
                EndDate = endDate
            };

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, variables).ToList();
        }

        public List<TimeTrackModel> GetByDateRangeAndUserId(int userId, DateTime startDate, DateTime endDate)
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.StartDate between @StartDate and @EndDate
                                                                AND T.UserId = @UserId AND T.EndDate IS NOT NULL
                                                                ORDER BY T.StartDate DESC";

            var variables = new
            {
                UserId = userId,
                StartDate = startDate,
                EndDate = endDate
            };

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, variables).ToList();
        }

        public void DeleteById(int id)
        {
            const string query = @"
                DELETE FROM TimeTracks
                WHERE Id = @Id
            ";

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {Id = id});
        }

        public int Create(TimeTrackModel timeTrackModel)
        {
            const string query = @"
                INSERT INTO TimeTracks
                (StartDate, EndDate, UserId, TotalTime, TimeTrackTypeId, CreationTypeId)
                OUTPUT Inserted.Id
                VALUES(@StartDate, @EndDate, @UserId, @TotalTime, @TimeTrackTypeId, @CreationTypeId)
            ";

            var timeTrackDbModel = mapper.Map<TimeTrackDbModel>(timeTrackModel);

            using var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, timeTrackDbModel);
        }
        
        public void CreateCollection(ICollection<TimeTrackModel> timeTrackModels)
        {
            const string query = @"
                INSERT INTO TimeTracks
                (StartDate, EndDate, UserId, TotalTime, TimeTrackTypeId, CreationTypeId)
                VALUES(@StartDate, @EndDate, @UserId, @TotalTime, @TimeTrackTypeId, @CreationTypeId)
            ";

            var timeTrackDbModels = mapper.Map<List<TimeTrackDbModel>>(timeTrackModels);

            using var connection = new SqlConnection(connectionString);
            connection.ExecuteScalar(query, timeTrackDbModels);
        }

        public TimeTrackModel? CheckForSameTimeTrack(DateTime startDate, DateTime endDate, int userId)
        {
            string query = CommonTimeTrackQueryString + " " + @"WHERE T.UserId = @UserId
                                                                AND T.StartDate = @StartDate
                                                                AND T.EndDate = @EndDate
                                                                ORDER BY T.Id DESC";

            var variables = new
            {
                StartDate = startDate,
                EndDate = endDate,
                UserId = userId
            };

            using var connection = new SqlConnection(connectionString);
            return QueryTimeTracks(query, variables).FirstOrDefault()!;
        }

        public List<TimeTrackModel> ValidateTimeTrack(DateTime startDate, DateTime endDate, int userId)
        {
            const string firstClause = @"
                WHERE T.UserId = @UserId
                AND @StartDate BETWEEN T.StartDate AND T.EndDate
                AND @EndDate BETWEEN T.StartDate AND T.EndDate
            ";

            const string secondClause = @"
                WHERE T.UserId = @UserId
                AND T.StartDate BETWEEN @StartDate AND @EndDate
                OR T.EndDate BETWEEN @StartDate AND @EndDate
                AND T.UserId = @UserId
            ";

            const string thirdClause = @"
                WHERE T.UserId = @UserId
                AND @StartDate BETWEEN T.StartDate AND T.EndDate 
                OR @EndDate BETWEEN T.StartDate AND T.EndDate
                AND T.UserId = @UserId
            ";

            List<string> clauses = new List<string>() {firstClause, secondClause, thirdClause};
            List<string> queries = new List<string>();

            foreach (var clause in clauses)
            {
                queries.Add(CommonTimeTrackQueryString + " " + clause);
            }

            var variables = new
            {
                StartDate = startDate,
                EndDate = endDate,
                UserId = userId
            };

            List<TimeTrackModel> result = new List<TimeTrackModel>();

            foreach (var query in queries)
            {
                var queryResult = QueryTimeTracks(query, variables).ToList();
                result.AddRange(queryResult);
            }

            return result;
        }

        private IEnumerable<TimeTrackModel> QueryTimeTracks(string query, object param)
        {
            using var connection = new SqlConnection(connectionString);

            return connection.Query<GetTimeTrackModel, TimeTrackTypeModel, CreationTypeModel,
                TimeTrackUpdateHistoryModel, UserModel, TimeTrackModel>(query,
                (timeTrack, timeTrackType, creationType, timeTrackUpdateHistoryModel, userModel) =>
                {
                    if (userModel != null)
                    {
                        timeTrackUpdateHistoryModel.User = userModel;
                    }

                    string? totalTime = timeTrack.TotalTime?.ToString();

                    return new TimeTrackModel()
                    {
                        Id = timeTrack.Id,
                        UserId = timeTrack.UserId,
                        CreationType = creationType,
                        StartDate = timeTrack.StartDate,
                        EndDate = timeTrack.EndDate,
                        TimeTrackType = timeTrackType,
                        TimeTrackUpdateHistory = timeTrackUpdateHistoryModel,
                        TotalTime = totalTime
                    };
                }, splitOn: "Id", param: param);
        }
    }
}