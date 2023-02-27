namespace Server.Business.Entities;

public class TimeTrackUpdateHistoryModel
{
    public int? Id { get; set; }
    public int? TimeTrackId { get; set; }
    public UserModel? User { get; set; } = new UserModel();
    public DateTime? Date { get; set; }
}