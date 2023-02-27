using GraphQL.Types;

namespace Server.GraphQL.Types.User;

public class ListUsersWithNumRecordsGraphType : ObjectGraphType
{
    public ListUsersWithNumRecordsGraphType()
    {
        Field<IntGraphType>("records");
        Field<ListGraphType<UserGraphType>>("users");
    }
}