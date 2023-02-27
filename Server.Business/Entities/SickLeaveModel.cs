namespace Server.Business.Entities;

public class SickLeaveModel
{
    public int Id { get; set; } 
        
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }

    public int UserId { get; set; }
}