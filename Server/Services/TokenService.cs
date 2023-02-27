using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.Business.Entities;
using Server.Interfaces;
using Server.Utilities;

namespace Server.Services;

public class TokenService : ITokenService
{
    private readonly string key;
    private readonly string issuer;
    private readonly string audience;
    private readonly int refreshTokenValidityInDays;
    private readonly int accessTokenValidityInMinutes;

    public TokenService(IConfiguration configuration)
    {
        key = configuration["Jwt:Key"];
        issuer = configuration["Jwt:Issuer"];
        audience = configuration["Jwt:Audience"];
        refreshTokenValidityInDays = Convert.ToInt32(configuration["Jwt:RefreshTokenValidityInDays"]);
        accessTokenValidityInMinutes = Convert.ToInt32(configuration["Jwt:AccessTokenValidityInMinutes"]);
    }

    public string GenerateAccessToken(IEnumerable<Claim> claims)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.Now.AddMinutes(accessTokenValidityInMinutes),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal GetPrincipalClaims(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = audience,
            ValidIssuer = issuer,
            RequireSignedTokens = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            RequireExpirationTime = false,
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

        var jwtSecurityToken = (JwtSecurityToken) securityToken;
        bool isAlgMatch = jwtSecurityToken.Header.Alg.Equals(
            SecurityAlgorithms.HmacSha256,
            StringComparison.InvariantCultureIgnoreCase
        );

        if (jwtSecurityToken == null || !isAlgMatch)
        {
            throw new SecurityTokenException("Invalid token");
        }

        return principal;
    }

    public RefreshTokenModel GenerateRefreshToken()
    {
        var expires = DateTime.Now.AddDays(refreshTokenValidityInDays);
        var token = RandomUtilities.GenerateRandomString(64);

        return new RefreshTokenModel
        {
            Token = token,
            Expires = expires
        };
    }
}