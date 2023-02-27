namespace Server.Models.Vacation;

public class CreateVacationModel
{
    public int UserId { set; get; }
    public DateTime StartDate { set; get; }
    public DateTime EndDate { set; get; }
    public string? Comment { set; get; }
}