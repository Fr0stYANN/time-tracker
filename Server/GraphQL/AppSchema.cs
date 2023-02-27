using GraphQL.Types;
using Server.Interfaces;

namespace Server.GraphQL;

public class AppSchema : Schema
{
    public AppSchema(IServiceProvider serviceProvider) : base(serviceProvider)
    {
        Query = serviceProvider.GetRequiredService<RootQueries>();
        Mutation = serviceProvider.GetRequiredService<RootMutations>();
    }
}