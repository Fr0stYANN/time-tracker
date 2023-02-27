using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dapper.Transaction;
using System.Threading.Tasks;
using Server.MSSQL.Models;
using Server.MSSQL.Mapper;

namespace Server.MSSQL.Repositories
{
    public class CalendarRepository : ICalendarRepository
    {
        private readonly string connectionString;
        private readonly IMapper mapper;

        public CalendarRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MsSql");
            mapper = new MapperSetup().Mapper;
        }

        public void CreateRange(List<CalendarModel> calendarModels)
        {
            string query = @"INSERT INTO Calendar
                           (Date, DayTypeId, HoursToWork)
                           VALUES (@Date, @DayTypeId, @HoursToWork)";

            var calendarDbModels = mapper.Map<List<CalendarDbModel>>(calendarModels);

            var connection = new SqlConnection(connectionString);
            connection.Open();

            var transaction = connection.BeginTransaction();
            
            try
            {
                transaction.Execute(query, calendarDbModels);
                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public int CreateSingle(CalendarModel calendar)
        {
            string query = @"INSERT INTO Calendar
                           (Date, DayTypeId, HoursToWork)
                           OUTPUT Inserted.Id
                           VALUES (@Date, @DayTypeId, @HoursToWork)";

            var calendarDbModel = mapper.Map<CalendarDbModel>(calendar);

            using var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, calendarDbModel);
        }

        public void DeleteById(int id)
        {
            string query = @"DELETE FROM Calendar
                             WHERE Id = @Id";

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {Id = id});
        }

        public void DeleteByDate(DateTime date)
        {
            string query = @"DELETE FROM Calendar
                             WHERE Date = @Date";

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, new {Date = date});
        }

        public void Update(CalendarModel calendarModel)
        {
            string query = @"UPDATE Calendar
                            SET Date = @Date, DayTypeId = @DayTypeId, HoursToWork = @HoursToWork
                            WHERE Id = @Id";

            var calendarDbModel = mapper.Map<CalendarDbModel>(calendarModel);

            using var connection = new SqlConnection(connectionString);
            connection.Execute(query, calendarDbModel);
        }

        public List<CalendarModel> GetAll()
        {
            string query = @"
                             SELECT 
                             C.Id,
                             C.Date,
                             C.HoursToWork,
                             C.DayTypeId,
                             D.Id,
                             D.Name
                             FROM Calendar C
                             LEFT JOIN DayTypes D ON D.Id = C.DayTypeId";

            using var connection = new SqlConnection(connectionString);
            return connection.Query<CalendarModel, DayTypeModel, CalendarModel>(query,
                (calendar, dayType) =>
                {
                    calendar.DayType = dayType;
                    return calendar;
                }, splitOn: "Id").ToList();
        }

        public List<CalendarModel> GetByRange(DateTime startDate, DateTime endDate)
        {
            string query = @"
                             SELECT 
                             C.Id,
                             C.Date,
                             C.HoursToWork,
                             C.DayTypeId,
                             D.Id,
                             D.Name
                             FROM Calendar C
                             LEFT JOIN DayTypes D ON D.Id = C.DayTypeId
                             WHERE C.Date between @StartDate AND @EndDate";

            using var connection = new SqlConnection(connectionString);
            return connection.Query<CalendarModel, DayTypeModel, CalendarModel>(query,
                (calendar, dayType) =>
                {
                    calendar.DayType = dayType;
                    return calendar;
                }, splitOn: "Id", param: new {StartDate = startDate, EndDate = endDate}).ToList();
        }

        public CalendarModel? GetById(int id)
        {
            string query = @"
                             SELECT 
                             C.Id,
                             C.Date,
                             C.HoursToWork,
                             C.DayTypeId,
                             D.Id,
                             D.Name
                             FROM Calendar C
                             LEFT JOIN DayTypes D ON D.Id = C.DayTypeId
                             WHERE C.Id = @Id";

            using var connection = new SqlConnection(connectionString);

            return connection.Query<CalendarModel, DayTypeModel, CalendarModel>(query, (calendar, dayType) =>
            {
                calendar.DayType = dayType;
                return calendar;
            }, splitOn: "Id", param: new {Id = id}).FirstOrDefault();
        }

        public CalendarModel? GetByDate(DateTime date)
        {
            string query = @"
                             SELECT 
                             C.Id,
                             C.Date,
                             C.HoursToWork,
                             C.DayTypeId,
                             D.Id,
                             D.Name
                             FROM Calendar C
                             LEFT JOIN DayTypes D ON D.Id = C.DayTypeId
                             WHERE C.Date = @Date";

            using var connection = new SqlConnection(connectionString);
            return connection.Query<CalendarModel, DayTypeModel, CalendarModel>(query, (calendar, dayType) =>
            {
                calendar.DayType = dayType;

                return calendar;
            }, splitOn: "Id", param: new {Date = date}).FirstOrDefault();
        }
    }
}