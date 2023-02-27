using System.Security.Claims;
using Server.Business.Entities;

namespace Server.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(IEnumerable<Claim> claims);
        
    ClaimsPrincipal GetPrincipalClaims(string token);
        
    RefreshTokenModel GenerateRefreshToken();
}