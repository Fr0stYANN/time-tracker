namespace Server.Models.Calendar
{
    public class SingleCalendarInputModel
    {
        public DateTime Date { get; set; }
        public int DayTypeId { get; set; }
        public int? HoursToWork { get; set; }
    }
}
