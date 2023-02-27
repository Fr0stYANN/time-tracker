using Server.Business.Entities;

namespace Server.Models.Auth;

public class AuthenticatedResponseModel
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public UserModel? User { get; set; } = new UserModel();
}