using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.GraphQL.Types.SickLeave;
using Server.Interfaces;
using Server.Models.SickLeave;
using Server.Types;
using Server.Validators.User;

namespace Server.GraphQL.Mutations;

public class SickLeaveMutations : ObjectGraphType
{
    public SickLeaveMutations(ISickLeaveRepository sickLeaveRepository, IMapper mapper, IAppModelsValidator validator)
    {
        Field<SickLeaveGraphType>()
            .Name("Create")
            .Description("Create sick leave for user")
            .Argument<NonNullGraphType<CreateSickLeaveInputGraphType>>("sickLeave")
            .Resolve(context =>
            {
                var createSickLeaveInputModel = context.GetArgument<CreateSickLeaveInputModel>("sickLeave");
                var sickLeaveModel = mapper.Map<SickLeaveModel>(createSickLeaveInputModel);
                
                validator.Validate<int, UserActivatedValidator>(sickLeaveModel.UserId);
                
                var createdSickLeaveId = sickLeaveRepository.Create(sickLeaveModel);

                return sickLeaveRepository.GetById(createdSickLeaveId);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);
        
        Field<SickLeaveGraphType>()
            .Name("Update")
            .Description("Update sick leave for user")
            .Argument<NonNullGraphType<UpdateSickLeaveInputGraphType>>("sickLeave")
            .Resolve(context =>
            {
                var updateSickLeaveInputModel = context.GetArgument<UpdateSickLeaveInputModel>("sickLeave");
                var sickLeaveModel = mapper.Map<SickLeaveModel>(updateSickLeaveInputModel);
                
                validator.Validate<int, UserActivatedValidator>(sickLeaveModel.UserId);
                
                sickLeaveRepository.Update(sickLeaveModel);

                return sickLeaveRepository.GetById(updateSickLeaveInputModel.Id);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);
        
        Field<IntGraphType>()
            .Name("Delete")
            .Description("Delete sick leave for user")
            .Argument<NonNullGraphType<IntGraphType>>("sickLeaveId")
            .Resolve(context =>
            {
                var sickLeaveId = context.GetArgument<int>("sickLeaveId");
                var sickLeaveModel = sickLeaveRepository.GetById(sickLeaveId);
                
                validator.Validate<int, UserActivatedValidator>(sickLeaveModel.UserId);
                sickLeaveRepository.Delete(sickLeaveId);

                return sickLeaveId;
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.WorkTimeManagement);
    }
}