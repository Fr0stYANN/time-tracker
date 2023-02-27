namespace Server.Business.Entities
{
    public class UsersTimeModel
    {
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime EmploymentDate { get; set; }
        public string WorkType { get; set; } = string.Empty;
        public double WorkedTime { get; set; }
        public bool IsActivated { get; set; }
    }
}
