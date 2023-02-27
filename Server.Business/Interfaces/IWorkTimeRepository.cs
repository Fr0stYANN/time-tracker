using Server.Business.Entities;

namespace Server.Business.Interfaces
{
    public interface IWorkTimeRepository
    {
        int GetWorkHoursByRangeDate(DateTime startDate, DateTime endDate);

        int GetUserWorkedMinutesByDateRange(int userId, DateTime startDate, DateTime endDate);

        IEnumerable<UsersTimeModel> GetUsersWithWorkTimeByDateRange(
            DateTime startDate,
            DateTime endDate,
            List<SortModel> sort,
            List<FilterModel> filter,
            SearchModel search
        );
    }
}
