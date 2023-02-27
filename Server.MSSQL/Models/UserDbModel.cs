namespace Server.MSSQL.Models;

public class UserDbModel
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Firstname { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public int VacationDays { get; set; }
    public DateTime? EmploymentDate { get; set; }
    public int? WorkTypeId { get; set; }
    public bool IsActivated { get; set; }
}