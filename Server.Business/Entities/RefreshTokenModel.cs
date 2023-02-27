namespace Server.Business.Entities;

public class RefreshTokenModel
{
    public int Id { get; set; }

    public int UserId { get; set; }
    
    public string Token { get; set; } = string.Empty;
    
    public DateTime Expires { get; set; }
}