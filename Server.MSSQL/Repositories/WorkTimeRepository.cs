using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Microsoft.Data.SqlClient;
using static Server.MSSQL.Utilities.FormatUtilities;
using DapperQueryBuilder;
using Server.MSSQL.Utilities;
using Dapper;

namespace Server.MSSQL.Repositories
{
    public class WorkTimeRepository : IWorkTimeRepository
    {
        private readonly string connectionString;

        public WorkTimeRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
        }

        public int GetWorkHoursByRangeDate(DateTime startDate, DateTime endDate)
        {
            using var connection = new SqlConnection(connectionString);

            var usersQueryBuilder = connection.QueryBuilder($@"
                DECLARE @StartDate DATE;
                DECLARE @EndDate DATE;
                DECLARE @TotDays INT;
                DECLARE @DayOff INT;
                DECLARE @ShortDay INT = 0;
                DECLARE @ShortDayTotHours INT = 0;

                DECLARE @HoursInDay INT = 8;
                DECLARE @TotalHours INT;

                SET @StartDate = {startDate};
                SET @EndDate = {endDate};
                SET @TotDays = DATEDIFF(DAY, @StartDate, @EndDate) + 1;
                SET @DayOff = (SELECT COUNT(DayTypeID) FROM Calendar 
                    WHERE (DayTypeId = 2 OR DayTypeId = 4)
                    AND Date BETWEEN @StartDate AND @EndDate
                );

                SET @ShortDay = (SELECT Count(DayTypeId) FROM Calendar 
                    WHERE DayTypeId = 3
                    AND Date BETWEEN @StartDate AND @EndDate
                );

                SET @ShortDayTotHours = (SELECT Sum(HoursToWork) FROM Calendar 
                    WHERE DayTypeId = 3
                    AND Date BETWEEN @StartDate AND @EndDate
                );				

                SET @TotalHours = (@TotDays * @HoursInDay) - 
                    (@DayOff * @HoursInDay);

                IF(@ShortDayTotHours IS NOT NULL)
                SET @TotalHours = @TotalHours - ((@ShortDay * @HoursInDay) - @ShortDayTotHours);

                SELECT DISTINCT
                  @TotalHours as AllTimes
                FROM TimeTracks T
            ");

            return connection.QuerySingle<int>(usersQueryBuilder.Sql, usersQueryBuilder.Parameters);
        }

        public int GetUserWorkedMinutesByDateRange(int userId, DateTime startDate, DateTime endDate)
        {
            using var connection = new SqlConnection(connectionString);

            var usersQueryBuilder = connection.QueryBuilder($@"
                DECLARE @StartDate DATETIME;
                DECLARE @EndDate DATETIME;
                DECLARE @WorkedTime int;

                SET @StartDate = {startDate};
                SET @EndDate = {endDate};
                SET @WorkedTime = (SELECT SUM(DATEDIFF(MINUTE, '0:00:00', TotalTime)) as WorkedTime
                    FROM TimeTracks T
                    WHERE T.UserId = {userId}
	                AND T.TimeTrackTypeId = 1
	                AND StartDate BETWEEN @StartDate AND @EndDate               
                )

                IF(@WorkedTime IS NULL) SET @WorkedTime = 0

                SELECT @WorkedTime
            ");

            return connection.QuerySingle<int>(usersQueryBuilder.Sql, usersQueryBuilder.Parameters);
        }

        public IEnumerable<UsersTimeModel> GetUsersWithWorkTimeByDateRange(
            DateTime startDate,
            DateTime endDate,
            List<SortModel>? sortModels,
            List<FilterModel>? filterModels,
            SearchModel? searchModel)
        {
            using var connection = new SqlConnection(connectionString);

            FormattableString sortSql;

            if (sortModels != null && sortModels.Any())
            {
                sortSql = GetUserFormatSort(sortModels);
            }
            else
            {
                sortSql = $"ORDER BY Firstname ASC";
            }

            var usersQueryBuilder = connection.QueryBuilder($@"
                DECLARE @StartDate DATE;
                DECLARE @EndDate DATE;

                SET @StartDate = {startDate};
                SET @EndDate = {endDate};

                SELECT DISTINCT
                  U.Firstname,
                  U.Lastname,
                  U.Email,
                  U.EmploymentDate,
                  U.IsActivated,
                  W.Name as WorkType,
                  (SELECT SUM(DATEDIFF(MINUTE, '0:00:00', TotalTime)) 
                  FROM TimeTracks T
                  WHERE T.UserId=U.Id and StartDate 
                  BETWEEN  @StartDate AND @EndDate                    
                  and T.TimeTrackTypeId = 1) as WorkedTime

                FROM TimeTracks T, Users U
                LEFT JOIN WorkTypes W on W.Id = U.WorkTypeId
                /**where**/
                {sortSql}
            ");

            if (filterModels != null && filterModels.Any())
            {
                usersQueryBuilder.Where(GetFormatFilters(filterModels));
            }

            if (searchModel != null)
            {
                usersQueryBuilder.Where(GetUserFormatSearch(searchModel));
            }

            return connection.Query<UsersTimeModel>(usersQueryBuilder.Sql, usersQueryBuilder.Parameters).ToList();
        }
    }
}