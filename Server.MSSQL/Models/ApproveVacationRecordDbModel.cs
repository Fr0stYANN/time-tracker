namespace Server.MSSQL.Models;
    
public class ApproveVacationDbModel
{
    public int Id { set; get; }
    public int VacationId { set; get; }
    public int ApproverId { set; get; }
    public bool? IsApproved { set; get; }
    public string? Comment { set; get; }
}