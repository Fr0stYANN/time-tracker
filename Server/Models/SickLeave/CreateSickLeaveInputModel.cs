namespace Server.Models.SickLeave;

public class CreateSickLeaveInputModel
{
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public int UserId { get; set; }
}