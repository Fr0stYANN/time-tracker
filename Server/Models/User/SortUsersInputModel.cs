namespace Server.Models.User;

public class SortUsersInputModel
{
    public string Field { get; set; } = string.Empty;
    
    public string Order { get; set; } = string.Empty;
}