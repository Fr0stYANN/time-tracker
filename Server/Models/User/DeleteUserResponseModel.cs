namespace Server.Models.User;

public class DeleteUserResponseModel
{
    public int UserId { set; get; }
    public bool IsAdminDeleteHimself { set; get; }
}