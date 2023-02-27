using System.Security.Cryptography;

namespace Server.Utilities;

public static class RandomUtilities
{
    static readonly string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    
    public static string GenerateRandomString(int length)
    {
        var result = string.Empty;

        using var randomNumberGenerator = RandomNumberGenerator.Create();

        while (result.Length != length)
        {
            byte[] oneByte = new byte[1];
            randomNumberGenerator.GetBytes(oneByte);

            char character = (char) oneByte[0];
            
            if (chars.Contains(character))
                result += character;
        }

        return result;
    }
}