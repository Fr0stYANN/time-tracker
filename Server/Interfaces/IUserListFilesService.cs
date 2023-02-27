using OfficeOpenXml;
using Server.Business.Entities;

namespace Server.Interfaces
{
    public interface IUserListFilesService
    {
        string GetUsersFile(
            DateTime startDate,
            DateTime endDate,
            List<SortModel> sort,
            List<FilterModel> filter,
            SearchModel search
        );
    }
}