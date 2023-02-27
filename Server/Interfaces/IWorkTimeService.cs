using Server.Models.WorkTime;

namespace Server.Interfaces;

public interface IWorkTimeService
{
    IEnumerable<WorkTimeDateModel> GetDailyWorkTimeByUserIdAndDates(GetDailyWorkTimeUserInputModel getDailyWorkTimeUserInputModel);
}