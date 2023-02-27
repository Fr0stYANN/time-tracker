using GraphQL.Types;
using Server.Models.Get;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class SearchUsersInputGraphType: InputObjectGraphType<SearchUsersInputModel>
{
    public SearchUsersInputGraphType()
    {
        Field(x => x.Field);
        Field(x => x.Like);
    }
}