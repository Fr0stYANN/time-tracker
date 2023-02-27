namespace Server.MSSQL.Models;

public class ApproveVacationUser
{
    public int Id { set; get; }
    public int UserId { set; get; }
    public int ApproverId { set; get; }
}