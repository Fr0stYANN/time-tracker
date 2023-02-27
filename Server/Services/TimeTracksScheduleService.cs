using System.Transactions;
using Quartz;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;

namespace Server.Services
{
    public class TimeTracksScheduleService : IJob
    {
        private readonly ICalendarRepository calendarRepository;
        private readonly IUserRepository userRepository;
        private readonly IScheduledExecuteRepository scheduleRepository;
        private readonly IVacationRepository vacationRepository;
        private readonly ISickLeaveRepository sickLeaveRepository;
        private readonly ITimeTrackRepository timeTrackRepository;

        public TimeTracksScheduleService(
            ICalendarRepository calendarRepository,
            IUserRepository userRepository,
            IScheduledExecuteRepository scheduleRepository,
            IVacationRepository vacationRepository,
            ISickLeaveRepository sickLeaveRepository,
            ITimeTrackRepository timeTrackRepository)
        {
            this.calendarRepository = calendarRepository;
            this.userRepository = userRepository;
            this.scheduleRepository = scheduleRepository;
            this.vacationRepository = vacationRepository;
            this.sickLeaveRepository = sickLeaveRepository;
            this.timeTrackRepository = timeTrackRepository;
        }
        public Task Execute(IJobExecutionContext context)
        {
            ExecuteScheduled();
            Console.WriteLine($"Executed at {DateTime.UtcNow}");
            return Task.CompletedTask;
        }
        public void ExecuteScheduled()
        {
            AutoCreateTimeTracks(DateTime.Today.AddSeconds(-1));
        }
        
        public void ExecuteUncompleted()
        {
            var dateSuccessfulExecution = scheduleRepository.GetDateByName(Schedule.TimeTracks);

            if (dateSuccessfulExecution == null) return;

            var intermediateDate = dateSuccessfulExecution.Value.AddDays(1);
            
            while (intermediateDate < DateTime.Today)
            {
                AutoCreateTimeTracks(intermediateDate);
                
                intermediateDate = intermediateDate.AddDays(1);
            }
        }

        private void AutoCreateTimeTracks(DateTime date)
        {
            using var transactionScope = new TransactionScope();
            
            var dateCalendar = calendarRepository.GetByDate(date);
            var dateCalendarName = dateCalendar?.DayType.Name;

            if (dateCalendarName == DayType.DayOff || dateCalendarName == DayType.Holiday)
            {
                scheduleRepository.UpdateDateByName(Schedule.TimeTracks, date);
                transactionScope.Complete();
                return;
            }
            
            var users = userRepository.GetAll(out _);

            foreach (var user in users)
            {
                if (!user.IsActivated) continue;
                
                var sickLeave = sickLeaveRepository.GetByUserIdAndDate(user.Id, date);
                var vacation = vacationRepository.GetByUserIdAndDate(user.Id, date);

                if (sickLeave != null) continue;

                if (vacation != null && vacation.IsApproved) continue;

                if (user.WorkType.Name == "full-time")
                {
                    timeTrackRepository.Create(GetTimeTrackModel(user, date, 1, dateCalendar));
                }
            }

            scheduleRepository.UpdateDateByName(Schedule.TimeTracks, date);
            transactionScope.Complete();
        }

        private static TimeTrackModel GetTimeTrackModel(
            UserModel userModel,
            DateTime date,
            int timeTrackTypeId,
            CalendarModel? calendarModel)
        {
            int workHours = calendarModel?.DayType.Name == DayType.ShortDay ? (int) calendarModel.HoursToWork! : 8;
            var startDate = new DateTime(date.Year, date.Month, date.Day, 5, 0, 0);

            var timeTrackModel = new TimeTrackModel()
            {
                UserId = userModel.Id,
                CreationType = {Id = 1},
                TimeTrackType = {Id = timeTrackTypeId},
                StartDate = startDate,
                EndDate = new DateTime(date.Year, date.Month, date.Day, startDate.Hour + workHours, 0, 0)
            };

            var totalTime = timeTrackModel.EndDate - timeTrackModel.StartDate;
            timeTrackModel.TotalTime = $@"{(int) totalTime.Value.TotalHours}:{totalTime:mm\:ss}";

            return timeTrackModel;
        }
    }
}


// public void AutoCreateDayOffForAYear()
// {
//     int currentYear = DateTime.Now.Year;
//
//     var startDate = new DateTime(currentYear, 1, 1);
//     var dates = new List<DateTime>();
//
//     while (startDate.Year == currentYear)
//     {
//         bool isSaturday = startDate.DayOfWeek == DayOfWeek.Saturday;
//         bool isSunday = startDate.DayOfWeek == DayOfWeek.Sunday;
//
//         if (isSaturday || isSunday)
//         {
//             dates.Add(startDate);
//         }
//
//         startDate = startDate.AddDays(1);
//     }
//
//     foreach (var date in dates)
//     {
//         var calendar = new CalendarModel
//         {
//             DayType = new DayTypeModel {Id = 2},
//             Date = date
//         };
//
//         calendarRepository.CreateSingle(calendar);
//     }
// }