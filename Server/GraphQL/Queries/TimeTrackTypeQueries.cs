using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries;

public class TimeTrackTypeQueries : ObjectGraphType
{
    public TimeTrackTypeQueries(ITimeTrackTypeRepository timeTrackTypeRepository)
    {
        Field<ListGraphType<TimeTrackTypeGraphType>>()
            .Name("getAll")
            .Description("This query allows to get all time track types")
            .Resolve(context =>
            {
                return timeTrackTypeRepository.GetAll();
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<TimeTrackGraphType>()
            .Name("getById")
            .Description("This query allows to get time track type by id")
            .Argument<NonNullGraphType<IntGraphType>>("id")
            .Resolve(context =>
            {
                var id = context.GetArgument<int>("id");

                return timeTrackTypeRepository.GetById(id);
            })
            .AuthorizeWithPolicy(PolicyType.User);

    }
}