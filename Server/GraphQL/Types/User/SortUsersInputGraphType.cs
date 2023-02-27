using GraphQL.Types;
using Server.Models.Get;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class SortUsersInputGraphType: InputObjectGraphType<SortUsersInputModel>
{
    public SortUsersInputGraphType()
    {
        Field(x => x.Field);
        Field(x => x.Order);
    }
}