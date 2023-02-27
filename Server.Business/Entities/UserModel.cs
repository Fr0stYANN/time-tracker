namespace Server.Business.Entities;

public class UserModel
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Firstname { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public int VacationDays { get; set; }
    public DateTime EmploymentDate { get; set; }
    public WorkTypeModel WorkType { get; set; } = new WorkTypeModel();
    public List<string> VacationApprovers { set; get; } = new List<string>();
    public List<OptionModel>? Options { get; set; } = new List<OptionModel>();
    public bool IsActivated { get; set; }
}

