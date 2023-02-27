namespace Server.Models.User;

public class SearchUsersInputModel
{
    public string Field { get; set; } = string.Empty;
    
    public string Like { get; set; } = string.Empty;
}