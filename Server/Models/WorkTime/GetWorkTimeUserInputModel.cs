namespace Server.Models.WorkTime;

public class GetWorkTimeUserInputModel
{
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}