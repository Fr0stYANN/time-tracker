namespace Server.MSSQL.Models;

public class TimeTrackDbModel
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? TotalTime { get; set; }
    public int CreationTypeId { get; set; }
    public int TimeTrackTypeId { get; set; }
    public int UserId { get; set; }
}