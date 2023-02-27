using System.Transactions;
using Quartz;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;

namespace Server.Services
{
    public class DaysOffScheduleService : IJob
    {
        private readonly ICalendarRepository calendarRepository;
        private readonly IScheduledExecuteRepository scheduleRepository;


        public DaysOffScheduleService(
            ICalendarRepository calendarRepository,
            IScheduledExecuteRepository scheduleRepository)
        {
            this.calendarRepository = calendarRepository;
            this.scheduleRepository = scheduleRepository;

        }
        public Task Execute(IJobExecutionContext context)
        {
            ExecuteScheduled();
            return Task.CompletedTask;
        }
        public void ExecuteScheduled()
        {
            var (firstDayOfNextMonth, lastDayOfNextMonth) = GetFirstAndLastDateOfMonth(DateTime.Today.AddMonths(1));
            AutoCreateDaysOffForRange(firstDayOfNextMonth, lastDayOfNextMonth, DateTime.Today);
        }
        public void ExecuteUncompleted()
        {
            var dateSuccessfulExecution = scheduleRepository.GetDateByName(Schedule.DaysOff);

            if (dateSuccessfulExecution == null)
            {
                var (firstDayOfMonth, lastDayOfMonth) = GetFirstAndLastDateOfMonth(DateTime.Today);
                AutoCreateDaysOffForRange(firstDayOfMonth, lastDayOfMonth, DateTime.Today);
                
                return;
            }

            if (CompareDatesByMonthAndYear(DateTime.Today, dateSuccessfulExecution.Value) == 0)
            {
                return;
            }

            var newCreateDaysOffDate = new DateTime(
                dateSuccessfulExecution.Value.Year,
                dateSuccessfulExecution.Value.Month,
                1
            ).AddMonths(1);
        
            while (CompareDatesByMonthAndYear(newCreateDaysOffDate, DateTime.Today) <= 0)
            {
                var (firstDayOfMonth, lastDayOfMonth) = GetFirstAndLastDateOfMonth(newCreateDaysOffDate);
                AutoCreateDaysOffForRange(firstDayOfMonth, lastDayOfMonth, newCreateDaysOffDate);

                newCreateDaysOffDate = newCreateDaysOffDate.AddMonths(1);
            }
        }

        private void AutoCreateDaysOffForRange(DateTime startDate, DateTime endDate, DateTime dateSuccessfulExecution)
        {
            using var transactionScope = new TransactionScope();

            var iterableDate = startDate;

            while (iterableDate <= endDate)
            {
                bool isSaturday = iterableDate.DayOfWeek == DayOfWeek.Saturday;
                bool isSunday = iterableDate.DayOfWeek == DayOfWeek.Sunday;

                if (isSaturday || isSunday)
                {
                    calendarRepository.CreateSingle(GetCalendarModel(iterableDate));
                }

                iterableDate = iterableDate.AddDays(1);
            }

            scheduleRepository.UpdateDateByName(Schedule.DaysOff, dateSuccessfulExecution);
            transactionScope.Complete();
        }

        private static CalendarModel GetCalendarModel(DateTime date)
        {
            return new CalendarModel()
            {
                Date = date,
                DayType = {Id = 2}
            };
        }

        private static int CompareDatesByMonthAndYear(DateTime firstDate, DateTime secondDate)
        {
            firstDate = new DateTime(firstDate.Year, firstDate.Month, 1);
            secondDate = new DateTime(secondDate.Year, secondDate.Month, 1);

            return DateTime.Compare(firstDate, secondDate);
        }

        private static (DateTime, DateTime) GetFirstAndLastDateOfMonth(DateTime date)
        {
            var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            return (firstDayOfMonth, lastDayOfMonth);
        }
    }
}