using AutoMapper;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.TimeTrack;
using Server.Models.WorkTime;

namespace Server.Services;

public class WorkTimeService : IWorkTimeService
{
    private readonly IWorkTimeRepository workTimeRepository;

    public WorkTimeService(IWorkTimeRepository workTimeRepository)
    {
        this.workTimeRepository = workTimeRepository;
    }

    public IEnumerable<WorkTimeDateModel> GetDailyWorkTimeByUserIdAndDates(GetDailyWorkTimeUserInputModel getDailyWorkTimeModel)
    {
        var workTimeDateModels = new List<WorkTimeDateModel>();
        
        var startDate = getDailyWorkTimeModel.StartDate;
        var endDate = getDailyWorkTimeModel.EndDate;
        var userId = getDailyWorkTimeModel.UserId;
        var isWeekendShows = getDailyWorkTimeModel.IsWeekendShows;
        
        for (var iterableDate = startDate; iterableDate <= endDate; iterableDate = iterableDate.AddDays(1))
        {
            var iterableStartDate = new DateTime(iterableDate.Year, iterableDate.Month, iterableDate.Day);
            var iterableEndDate = iterableStartDate.AddDays(1).AddSeconds(-1);
            
            var userWorkedMinutes = workTimeRepository.GetUserWorkedMinutesByDateRange(
                userId, 
                iterableStartDate, 
                iterableEndDate
            );
            
            workTimeDateModels.Add(new WorkTimeDateModel
            {
                Date = iterableDate,
                WorkedMinutes = userWorkedMinutes
            });
        }
        
        return isWeekendShows ? 
            workTimeDateModels : 
            workTimeDateModels.Where(model => 
                    model.Date.DayOfWeek != DayOfWeek.Saturday && 
                    model.Date.DayOfWeek != DayOfWeek.Sunday);
    }
}