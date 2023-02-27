namespace Server.Models.WorkTime;

public class GetDailyWorkTimeUserInputModel
{
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsWeekendShows { set; get; }
}