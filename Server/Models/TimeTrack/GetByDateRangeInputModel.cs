namespace Server.Models.TimeTrack;

public class GetByDateRangeInputModel
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}