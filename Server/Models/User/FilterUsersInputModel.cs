namespace Server.Models.User;

public class FilterUsersInputModel
{
    public string Field { get; set; } = string.Empty;

    public string[]? Values { get; set; }
}