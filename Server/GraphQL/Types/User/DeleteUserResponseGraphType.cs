using GraphQL.Types;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class DeleteUserResponseGraphType : ObjectGraphType<DeleteUserResponseModel>
{
    public DeleteUserResponseGraphType()
    {
        Field(response => response.UserId);
        Field(response => response.IsAdminDeleteHimself);
    }
}