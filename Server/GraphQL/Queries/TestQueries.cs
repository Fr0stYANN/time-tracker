using GraphQL;
using GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries;

public class TestQueries : ObjectGraphType
{
    public TestQueries()
    {
        Field<StringGraphType>()
            .Name("welcome")
            .Description("Test field for authorized user")
            .Resolve(context => "welcome user!")
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.UserManagement);
    }
}