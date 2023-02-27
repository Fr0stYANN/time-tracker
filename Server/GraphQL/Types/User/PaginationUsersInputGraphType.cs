using GraphQL.Types;
using Server.Models.Get;

namespace Server.GraphQL.Types.User;

public class PaginationUsersInputGraphType: InputObjectGraphType<PaginationUsersInputModel>
{
    public PaginationUsersInputGraphType()
    {
        Field(x => x.Page);
        Field(x => x.PageSize);
    }
}