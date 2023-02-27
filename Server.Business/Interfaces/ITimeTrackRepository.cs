using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Server.Business.Entities;

namespace Server.Business.Interfaces
{
    public interface ITimeTrackRepository
    {
        int Start(TimeTrackModel timeTrackModel);
        void Stop(TimeTrackModel timeTrackModel);
        void Update(TimeTrackModel timeTrackModel);
        TimeTrackModel GetById(int id);
        TimeTrackModel? GetLastByUserId(int userId);
        List<TimeTrackModel> GetListByUserId(int userId);
        List<TimeTrackModel> GetAll();
        List<TimeTrackModel> GetByDateRange(DateTime startDate, DateTime endDate);
        List<TimeTrackModel> GetByDateRangeAndUserId(int userId, DateTime startDate, DateTime endDate);
        void DeleteById(int id);
        int Create(TimeTrackModel timeTrackModel);
        TimeTrackModel? CheckForSameTimeTrack(DateTime startDate, DateTime endDate, int userId);
        List<TimeTrackModel> ValidateTimeTrack(DateTime startDate, DateTime endDate, int userId);
    }
}
