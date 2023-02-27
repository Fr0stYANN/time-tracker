namespace Server.Models.Auth
{
    public class LoginUserWithGoogleModel
    {
        public string ClientId { get; set; } = String.Empty;
        public string Credential { get; set; } = String.Empty;
    }
}
