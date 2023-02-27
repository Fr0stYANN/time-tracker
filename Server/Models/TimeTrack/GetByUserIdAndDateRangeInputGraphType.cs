namespace Server.Models.TimeTrack;

public class GetByUserIdAndDateRangeInputModel
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int UserId { get; set; }
}