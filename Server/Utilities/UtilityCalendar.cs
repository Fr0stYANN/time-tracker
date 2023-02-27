using Server.Business.Entities;
using Server.Models.Calendar;
using Server.MSSQL.Models;

namespace Server.Utilities
{
    public static class UtilityCalendar
    {
        public static List<CalendarModel> GetAllDates(RangeCalendarInputModel inputRange)
        {
            List<CalendarModel> calendarModels = new List<CalendarModel>();
            for (DateTime Day = inputRange.StartDate; Day <= inputRange.EndDate; Day = Day.AddDays(1))
            {
                CalendarModel calendarModel = new CalendarModel();
                calendarModel.Date = Day;
                calendarModel.DayType = new DayTypeModel();
                calendarModel.DayType.Id = inputRange.DayTypeId;
                calendarModel.HoursToWork = inputRange.HoursToWork;
                calendarModels.Add(calendarModel);
            }
            return calendarModels;
        }
    }
}
