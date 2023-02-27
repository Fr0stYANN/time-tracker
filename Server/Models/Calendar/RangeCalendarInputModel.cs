namespace Server.Models.Calendar
{
    public class RangeCalendarInputModel
    {
        public int DayTypeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? HoursToWork { get; set; }
    }
}
