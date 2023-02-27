using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries
{
    public class DayTypeQueries : ObjectGraphType
    {
        public DayTypeQueries(IDayTypeRepository dayTypeRepository)
        {
            Field<ListGraphType<DayTypeGraphType>>()
                .Name("getAll")
                .Description("Get all Day Types")
                .Resolve(context => dayTypeRepository.GetAll())
                .AuthorizeWithPolicy(PolicyType.User)
                .AuthorizeWithPolicy(PolicyType.CalendarManagement);

            Field<DayTypeGraphType>()
                .Name("getById")
                .Description("Get Day Type By Id")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");

                    return dayTypeRepository.GetById(id);
                })
                .AuthorizeWithPolicy(PolicyType.User)
                .AuthorizeWithPolicy(PolicyType.CalendarManagement);
        }
    }
}
