using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.GraphQL.Types.Vacation;
using Server.Types;

namespace Server.GraphQL.Queries;

public class VacationQueries : ObjectGraphType
{
    public VacationQueries(IVacationRepository vacationRepository)
    {
        Field<ListGraphType<VacationGraphType>>()
            .Name("getNeedsToApprove")
            .Description("graphql query to get vacation request needs to approve")
            .Argument<NonNullGraphType<IntGraphType>>("approverId")
            .Resolve(context =>
            {
                var approverId = context.GetValidatedArgument<int>("approverId");
                return vacationRepository.GetNeedsToApprove(approverId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<ListGraphType<VacationGraphType>>()
            .Name("getByUserId")
            .Description("graphql query to get user vacations request")
            .Argument<NonNullGraphType<IntGraphType>>("userId")
            .Resolve(context =>
            {
                var userId = context.GetValidatedArgument<int>("userId");
                return vacationRepository.GetByUserId(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<VacationGraphType>()
            .Name("getById")
            .Description("graphql query to get vacation by id")
            .Argument<NonNullGraphType<IntGraphType>>("vacationId")
            .Resolve(context =>
            {
                var id = context.GetValidatedArgument<int>("vacationId");
                return vacationRepository.GetById(id);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<ListGraphType<UserGraphType>>()
            .Name("userApprovers")
            .Description("graphql query to get user approvers emails")
            .Argument<NonNullGraphType<IntGraphType>>("userId")
            .Resolve(context =>
            {
                var userId = context.GetValidatedArgument<int>("userId");
                return vacationRepository.GetUserApprovers(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
    }
}