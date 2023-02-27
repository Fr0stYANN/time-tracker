using GraphQL.Types;
using Server.Models.Auth;

namespace Server.GraphQL.Types.Auth
{
    public class LoginUserWithGoogleInputGraphType : InputObjectGraphType<LoginUserWithGoogleModel>
    {
        public LoginUserWithGoogleInputGraphType()
        {
            Field(x => x.ClientId);
            Field(x => x.Credential);
        }
    }
}
