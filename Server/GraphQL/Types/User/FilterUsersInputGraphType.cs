using GraphQL.Types;
using Server.Models.Get;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class FilterUsersInputGraphType: InputObjectGraphType<FilterUsersInputModel>
{
    public FilterUsersInputGraphType()
    {
        Field(x => x.Field);
        Field<ListGraphType<StringGraphType>>("Values");
    }
}