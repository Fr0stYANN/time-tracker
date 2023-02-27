using GraphQL.Types;

namespace Server.GraphQL.Types.Auth;

public class LoginUserInputGraphType : InputObjectGraphType
{
    public LoginUserInputGraphType()
    {
        Field<NonNullGraphType<StringGraphType>>("email");
        Field<NonNullGraphType<StringGraphType>>("password");
    }
}