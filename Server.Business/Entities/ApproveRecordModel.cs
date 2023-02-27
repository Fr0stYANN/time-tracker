namespace Server.Business.Entities;

public class ApproveRecordModel
{
    public int Id { set; get; }
    public UserModel Approver { set; get; } = new UserModel();
    public bool? IsApproved { set; get; }
    public string? Comment { set; get; }
}