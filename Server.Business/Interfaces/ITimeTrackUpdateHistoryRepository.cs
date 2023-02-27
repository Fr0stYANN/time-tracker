using Server.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Business.Interfaces
{
    public interface ITimeTrackUpdateHistoryRepository
    {
        void Add(int? updatorId, int timeTrackId, DateTime date);
        TimeTrackUpdateHistoryModel? GetByTimeTrackId(int id);
        void Update(int updateHistoryId, int updatorId, int timeTrackId, DateTime date);
    }
}
