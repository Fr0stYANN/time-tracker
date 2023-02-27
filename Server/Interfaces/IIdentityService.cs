using Server.Models;
using Server.Models.Auth;

namespace Server.Interfaces
{
    public interface IIdentityService
    {
        AuthenticatedResponseModel Login(LoginUserRequestModel loginUserRequestModel);
        
        AuthenticatedResponseModel RefreshToken(string accessToken, string refreshToken);
        
        void RevokeToken(string accessToken);

        AuthenticatedResponseModel LoginWithGoogle(LoginUserWithGoogleModel loginUserWithGoogleModel);
    }
}
