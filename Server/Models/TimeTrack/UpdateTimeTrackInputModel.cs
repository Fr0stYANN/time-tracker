namespace Server.Models.TimeTrack;

public class UpdateTimeTrackInputModel
{
    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? UpdatorId { get; set; }
    public int? TimeTrackTypeId { get; set; }
}