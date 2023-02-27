namespace Server.Business.Entities;

public class VacationDbModel
{
    public int Id { set; get; }
    public int UserId { set; get; }
    public DateTime StartDate { set; get; }
    public DateTime EndDate { set; get; }
    public string? Comment { set; get; }
    public bool IsApproved { set; get; }
}