using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries
{
    public class SickLeaveQueries : ObjectGraphType
    {
        public SickLeaveQueries(ISickLeaveRepository sickLeaveRepository)
        {
            Field<ListGraphType<SickLeaveGraphType>>()
                .Name("getAllByUserId")
                .Description("Get all sick leave by user id")
                .Argument<NonNullGraphType<IntGraphType>>("UserId")
                .Resolve(context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    return sickLeaveRepository.GetAllByUserId(userId);
                })
                .AuthorizeWithPolicy(PolicyType.User);
        }
    }
}
