namespace Server.Business.Entities;

public class CalendarModel
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public DayTypeModel DayType { get; set; } = new DayTypeModel();
    public int? HoursToWork { get; set; }
}