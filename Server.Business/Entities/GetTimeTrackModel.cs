namespace Server.Business.Entities;

public class GetTimeTrackModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public TimeTrackTypeModel TimeTrackType { get; set; } = new TimeTrackTypeModel();
    public CreationTypeModel CreationType { get; set; } = new CreationTypeModel();
    public TimeTrackUpdateHistoryModel? TimeTrackUpdateHistory { get; set; } = new TimeTrackUpdateHistoryModel();
    public TimeSpan? TotalTime { get; set; }
}