using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.GraphQL.Types.TimeTrack;
using Server.Interfaces;
using Server.Models.TimeTrack;
using Server.Types;
using Server.Utilities;
using Server.Validators;

namespace Server.GraphQL.Queries;

public class TimeTrackQueries : ObjectGraphType
{
    public TimeTrackQueries(ITimeTrackRepository timeTrackRepository, IAppModelsValidator validator)
    {
        Field<TimeTrackGraphType>()
            .Name("getById")
            .Description("Get time track by id")
            .Argument<NonNullGraphType<IntGraphType>>("trackId")
            .Resolve(context =>
            {
                var trackId = context.GetArgument<int>("trackId");
                return timeTrackRepository.GetById(trackId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<ListGraphType<TimeTrackGraphType>>()
            .Name("getListByUserId")
            .Description("Get list of time tracks by userId and current page")
            .Argument<NonNullGraphType<IntGraphType>>("userId")
            .Resolve(context =>
            {
                var userId = context.GetArgument<int>("userId");
                return timeTrackRepository.GetListByUserId(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
            
        Field<ListGraphType<TimeTrackGraphType>>()
            .Name("getAll")
            .Description("Get time tracks for all users")
            .Resolve(context => timeTrackRepository.GetAll())
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);

        Field<ListGraphType<TimeTrackGraphType>>()
            .Name("getByDateRange")
            .Description("Get time tracks by date range")
            .Argument<NonNullGraphType<GetByDateRangeInputGraphType>>("timetrack")
            .Resolve(context =>
            {
                var inputModel = context.GetArgument<GetByDateRangeInputModel>("timetrack");
                validator.Validate<GetByDateRangeInputModel, GetByRangeInputModelValidator>(inputModel);
                
                return timeTrackRepository.GetByDateRange(inputModel.StartDate, inputModel.EndDate);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<ListGraphType<TimeTrackGraphType>>()
            .Name("getByUserIdAndDateRange")
            .Description("Get time tracks by date range")
            .Argument<NonNullGraphType<GetByUserIdAndDateRangeInputGraphType>>("timetrack")
            .Resolve(context =>
            {
                var inputModel = context.GetArgument<GetByUserIdAndDateRangeInputModel>("timetrack");
                validator.Validate<GetByUserIdAndDateRangeInputModel, GetByUserIdAndDateRangeInputModelValidator>(inputModel);
                
                return timeTrackRepository.GetByDateRangeAndUserId(inputModel.UserId, inputModel.StartDate, inputModel.EndDate);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<TimeTrackGraphType>()
            .Name("getUnfinishedTimeTrackByUserId")
            .Description("Get unfinished timetrack by user id or null")
            .Argument<NonNullGraphType<IntGraphType>>("userId")
            .Resolve(context =>
            {
                var userId = context.GetArgument<int>("userId");
                return timeTrackRepository.GetLastByUserId(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
    }
}