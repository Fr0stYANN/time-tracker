namespace Server.Models.Calendar
{
    public class UpdateCalendarInputModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int DayTypeId { get; set; }
        public int? HoursToWork { get; set; }
    }
}
