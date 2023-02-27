namespace Server.Models.SickLeave;

public class UpdateSickLeaveInputModel
{
    public int Id { get; set; }
    
    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
}