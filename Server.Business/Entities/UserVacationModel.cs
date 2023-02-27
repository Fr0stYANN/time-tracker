namespace Server.Business.Entities;

public class UserVacationModel
{ 
    public VacationModel Vacation { set; get; } = new VacationModel();
    public List<ApproveRecordModel> ApproveRecords { set; get; } = new List<ApproveRecordModel>();
}