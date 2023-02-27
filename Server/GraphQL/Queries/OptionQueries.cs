using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries;

public class OptionQueries : ObjectGraphType
{
    public OptionQueries(IOptionRepository optionRepository)
    {
        Field<ListGraphType<OptionGraphType>>()
            .Name("getAll")
            .Description("Get all options")
            .Resolve(context => optionRepository.GetAll())
            .AuthorizeWithPolicy(PolicyType.User);
    }
}