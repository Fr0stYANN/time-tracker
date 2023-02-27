namespace Server.Business.Entities;

public class VacationModel
{
    public int Id { set; get; }
    public DateTime StartDate { set; get; }
    public DateTime EndDate { set; get; }
    public string? Comment { set; get; } = String.Empty;
    public bool IsApproved { set; get; }
    public UserModel User { set; get; } = new();
    public List<ApproveRecordModel>? ApproveRecords { set; get; } = new();
}