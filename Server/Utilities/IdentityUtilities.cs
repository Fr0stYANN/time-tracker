using System.IdentityModel.Tokens.Jwt;

namespace Server.Utilities
{
    public static class IdentityUtilities
    {
        public static JwtSecurityToken DecodeJwtToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken decodedValue = handler.ReadJwtToken(token);

            return decodedValue;
        }
    }
}
