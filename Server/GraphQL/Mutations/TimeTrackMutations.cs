using System.Security.Claims;
using FluentValidation;
using GraphQL.Types;
using Server.GraphQL.Types;
using Server.Interfaces;
using GraphQL;
using Server.GraphQL.Types.TimeTrack;
using Server.Models.TimeTrack;
using Server.Types;
using Server.Business.Interfaces;
using Server.Utilities;
using Server.Validators;
using Server.Validators.TimeTrack;
using Server.Validators.User;

namespace Server.GraphQL.Mutations;

public class TimeTrackMutations : ObjectGraphType
{
    private readonly IHttpContextAccessor accessor;
    private readonly ITokenService tokenService;
    
    public TimeTrackMutations(
            ITimeTrackService timeTrackService, 
            ITimeTrackRepository timeTrackRepository, 
            IHttpContextAccessor accessor, 
            ITokenService tokenService,
            IAppModelsValidator validator
        )
    {
        this.accessor = accessor;
        this.tokenService = tokenService;
        
        Field<TimeTrackGraphType>()
            .Name("start")
            .Description("start tracking time of employee")
            .Argument<NonNullGraphType<IntGraphType>>("userId")
            .Argument<IntGraphType>("timeTrackTypeId")
            .Resolve(context =>
            {
                var userId = context.GetArgument<int>("userId");
                int timeTrackTypeId = context.GetArgument<int>("timeTrackTypeId");
                
                validator.Validate<int, UserActivatedValidator>(userId);

                return timeTrackTypeId != 0
                    ? timeTrackService.StartTimeTrack(userId, timeTrackTypeId)
                    : timeTrackService.StartTimeTrack(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.PartTimeUser);

        Field<TimeTrackGraphType>()
            .Name("stop")
            .Description("stop tracking time of employee")
            .Argument<NonNullGraphType<IntGraphType>>("id")
            .Resolve(context =>
            {
                var id = context.GetArgument<int>("id");
                return timeTrackService.StopTimeTrack(id);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.PartTimeUser);
        
        Field<TimeTrackGraphType>()
            .Name("create")
            .Description("Create time track for you")
            .Argument<NonNullGraphType<CreateTimeTrackInputGraphType>>("timetrack")
            .Resolve(context =>
            {
                var createTimeTrackInput = context.GetArgument<CreateTimeTrackInputModel>("timetrack");
                validator.Validate<int, UserActivatedValidator>(createTimeTrackInput.UserId);
                validator.Validate<CreateTimeTrackInputModel, CreateTimeTrackInputModelValidator>(createTimeTrackInput);
                
                return timeTrackService.Create(createTimeTrackInput, GetUserIdFromAccessToken());
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<TimeTrackGraphType>()
            .Name("createForUser")
            .Description("Create time track for user")
            .Argument<NonNullGraphType<CreateTimeTrackInputGraphType>>("timetrack")
            .Resolve(context =>
            {
                var createTimeTrackInput = context.GetArgument<CreateTimeTrackInputModel>("timetrack");
                validator.Validate<int, UserActivatedValidator>(createTimeTrackInput.UserId);
                validator.Validate<CreateTimeTrackInputModel, CreateTimeTrackForUserInputModelValidator>(createTimeTrackInput);
                
                return timeTrackService.Create(createTimeTrackInput, GetUserIdFromAccessToken());
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);
        
        Field<TimeTrackGraphType>()
            .Name("update")
            .Description("update your time track")
            .Argument<UpdateTimeTrackInputGraphType>("timetrack")
            .Resolve(context =>
            {
                var updateTimeTrackInputModel = context.GetArgument<UpdateTimeTrackInputModel>("timetrack");
                var timeTrackModel = timeTrackRepository.GetById(updateTimeTrackInputModel.Id);

                validator.Validate<int, UserActivatedValidator>(timeTrackModel.UserId);
                validator.Validate<UpdateTimeTrackInputModel, UpdateTimeTrackInputModelValidator>(updateTimeTrackInputModel);
                
                updateTimeTrackInputModel.UpdatorId = GetUserIdFromAccessToken();

                return timeTrackService.UpdateTimeTrack(updateTimeTrackInputModel);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<TimeTrackGraphType>()
            .Name("updateForUser")
            .Description("update some time track record of employee")
            .Argument<UpdateTimeTrackInputGraphType>("timetrack")
            .Resolve(context =>
            {
                var updateTimeTrackInputModel = context.GetArgument<UpdateTimeTrackInputModel>("timetrack");
                var timeTrackModel = timeTrackRepository.GetById(updateTimeTrackInputModel.Id);

                validator.Validate<int, UserActivatedValidator>(timeTrackModel.UserId);
                validator.Validate<UpdateTimeTrackInputModel, UpdateTimeTrackForUserInputModelValidator>(updateTimeTrackInputModel);
                updateTimeTrackInputModel.UpdatorId = GetUserIdFromAccessToken();
                
                return timeTrackService.UpdateTimeTrack(updateTimeTrackInputModel);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);

        Field<StringGraphType>()
            .Name("delete")
            .Description("delete your time track by id")
            .Argument<NonNullGraphType<IntGraphType>>("trackId")
            .Resolve(context =>
            {
                var trackId = context.GetArgument<int>("trackId");
                var timeTrackModel = timeTrackRepository.GetById(trackId);
                
                validator.Validate<int, DeleteTimeTrackValidator>(trackId);
                validator.Validate<int, UserActivatedValidator>(timeTrackModel.UserId);
                
                timeTrackRepository.DeleteById(trackId);

                return $"Time track with id {trackId} has been deleted";
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<StringGraphType>()
            .Name("deleteForUser")
            .Description("delete some user time track by id")
            .Argument<NonNullGraphType<IntGraphType>>("trackId")
            .Resolve(context =>
            {
                var trackId = context.GetValidatedArgument<int>("trackId");
                var timeTrackModel = timeTrackRepository.GetById(trackId);
                
                validator.Validate<int, DeleteTimeTrackForUserValidator>(trackId);
                validator.Validate<int, UserActivatedValidator>(timeTrackModel.UserId);
                
                timeTrackRepository.DeleteById(trackId);

                return $"Time track with id {trackId} has been deleted";
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);
    }

    private int GetUserIdFromAccessToken()
    {
        string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
            .ToString()
            .Remove(0, 7);
        
        var userClaims = tokenService.GetPrincipalClaims(accessToken);
        return Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));
    }
}