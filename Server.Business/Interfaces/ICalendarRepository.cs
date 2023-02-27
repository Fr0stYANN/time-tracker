using Server.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Business.Interfaces
{
    public interface ICalendarRepository
    {
        int CreateSingle(CalendarModel calendar);
        void CreateRange(List<CalendarModel> calendarModels);
        void DeleteByDate(DateTime date);
        void DeleteById(int id);
        void Update(CalendarModel calendarModel);
        List<CalendarModel> GetAll();
        List<CalendarModel> GetByRange(DateTime startDate, DateTime endDate);
        CalendarModel? GetById(int id);
        CalendarModel? GetByDate(DateTime date);
    }
}
