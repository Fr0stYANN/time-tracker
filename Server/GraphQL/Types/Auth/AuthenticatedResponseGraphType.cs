using GraphQL.Types;
using Server.Models.Auth;

namespace Server.GraphQL.Types.Auth;

public class AuthenticatedResponseGraphType : ObjectGraphType<AuthenticatedResponseModel>
{
    public AuthenticatedResponseGraphType()
    {
        Field(response => response.AccessToken);
        Field(response => response.RefreshToken);
        Field<UserGraphType>("user");
    }
}