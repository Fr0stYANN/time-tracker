using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.GraphQL.Types.Vacation;
using Server.Interfaces;
using Server.Models.Vacation;
using Server.Types;
using Server.Utilities;
using Server.Validators.User;
using Server.Validators.Vacation;

namespace Server.GraphQL.Mutations;

public class VacationMutations : ObjectGraphType
{
    public VacationMutations(
        IMapper mapper, 
        IVacationService vacationService,
        IAppModelsValidator validator,
        IVacationRepository vacationRepository
        )
    {
        Field<VacationGraphType>()
            .Name("create")
            .Description("graphql mutation to create vacation request")
            .Argument<NonNullGraphType<CreateVacationGraphType>>("vacation")
            .Resolve(context =>
            {
                var createVacationModel = context.GetArgument<CreateVacationModel>("vacation");
                validator.Validate<int, UserActivatedValidator>(createVacationModel.UserId);
                validator.Validate<CreateVacationModel, CreateVacationInputModelValidator>(createVacationModel);
                var vacationModel = mapper.Map<VacationModel>(createVacationModel);
                
                return vacationService.Create(vacationModel);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<VacationGraphType>()
            .Name("update")
            .Description("graphql mutation to update request")
            .Argument<NonNullGraphType<UpdateVacationInputGraphType>>("vacation")
            .Resolve(context =>
            {
                var updateVacationModel = context.GetArgument<UpdateVacationModel>("vacation");
                validator.Validate<int, UserActivatedValidator>(updateVacationModel.UserId);
                validator.Validate<UpdateVacationModel, UpdateVacationInputModelValidator>(updateVacationModel);
                var vacationModel = mapper.Map<VacationModel>(updateVacationModel);
                
                return vacationService.Update(vacationModel);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<StringGraphType>()
            .Name("delete")
            .Description("graphql mutation to delete vacation")
            .Argument<NonNullGraphType<IntGraphType>>("id")
            .Resolve(context =>
            {
                var id = context.GetArgument<int>("id");
                var vacationModel = vacationRepository.GetById(id);
                
                validator.Validate<int, UserActivatedValidator>(vacationModel.User.Id);
                validator.Validate<int, DeleteVacationValidator>(id);
                
                return vacationService.Delete(id);
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<StringGraphType>()
            .Name("approve")
            .Description("graphql mutation to approve vacation request record")
            .Argument<NonNullGraphType<IntGraphType>>("vacationRecordId")
            .Argument<StringGraphType>("comment")
            .Resolve(context =>
            {
                var id = context.GetValidatedArgument<int>("vacationRecordId");
                var comment = context.GetValidatedArgument<string>("comment");
                var vacationModel = vacationRepository.GetById(id);
                
                validator.Validate<int, UserActivatedValidator>(vacationModel.User.Id);

                return vacationService.Approve(id, comment);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<StringGraphType>()
            .Name("decline")
            .Description("graphql mutation to decline vacation request record")
            .Argument<NonNullGraphType<IntGraphType>>("vacationRecordId")
            .Argument<StringGraphType>("comment")
            .Resolve(context =>
            {
                var id = context.GetValidatedArgument<int>("vacationRecordId");
                var comment = context.GetValidatedArgument<string>("comment");
                var vacationModel = vacationRepository.GetById(id);
                
                validator.Validate<int, UserActivatedValidator>(vacationModel.User.Id);

                return vacationService.Decline(id, comment);
            })
            .AuthorizeWithPolicy(PolicyType.User);
    }
}