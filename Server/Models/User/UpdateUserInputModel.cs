namespace Server.Models.User;

public class UpdateUserInputModel
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Firstname { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public DateTime EmploymentDate { get; set; }
    public int WorkTypeId { get; set; }
    public List<string> VacationApprovers { set; get; } = new List<string>();
    public List<int>? Options { get; set; } = new List<int>();
}