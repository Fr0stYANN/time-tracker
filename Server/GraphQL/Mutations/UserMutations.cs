using AutoMapper;
using FluentValidation;
using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.GraphQL.Types.User;
using Server.Interfaces;
using Server.Models.User;
using Server.Types;
using Server.Utilities;
using Server.Validators;
using Server.Validators.User;

namespace Server.GraphQL.Mutations;

public class UserMutations : ObjectGraphType
{
    public UserMutations(
        IUserService userService, 
        IMapper mapper, 
        IUserRepository userRepository,
        IAppModelsValidator validator,
        ITokenRepository tokenRepository
        )
    {
        Field<UserGraphType>()
            .Name("Create")
            .Description("Create user")
            .Argument<CreateUserInputGraphType>("User")
            .Resolve(context =>
            {
                var createUserInputModel = context.GetArgument<CreateUserInputModel>("User");
                validator.Validate<CreateUserInputModel, CreateUserInputModelValidator>(createUserInputModel);
                var userModel = mapper.Map<UserModel>(createUserInputModel);
                
                return userService.Create(userModel);;
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.UserManagement);

        Field<UserGraphType>()
            .Name("Update")
            .Description("Update user")
            .Argument<UpdateUserInputGraphType>("User")
            .Resolve(context =>
            {
                var updateUserInputModel = context.GetArgument<UpdateUserInputModel>("User");
                validator.Validate<int, UserActivatedValidator>(updateUserInputModel.Id);
                validator.Validate<UpdateUserInputModel, UpdateUserInputModelValidator>(updateUserInputModel);
                
                var userModelById = userRepository.GetById(updateUserInputModel.Id);

                var userModel = mapper.Map<UserModel>(updateUserInputModel);
                userModel.Password = userModelById!.Password;
                userModel.VacationDays = userModelById.VacationDays;

                return userService.Update(userModel);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.UserManagement);
        
        Field<IntGraphType>()
            .Name("SetActivationStatus")
            .Description("Set activation status of user account")
            .Argument<NonNullGraphType<IntGraphType>>("Id")
            .Argument<NonNullGraphType<BooleanGraphType>>("IsActivated")
            .Resolve(context =>
            {
                var userId = context.GetArgument<int>("Id");
                var status = context.GetArgument<bool>("IsActivated");
                validator.Validate<int, UserIdValidator>(userId);

                tokenRepository.RemoveByUserId(userId);  
                userRepository.SetActivationStatus(userId, status);

                return userId;
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.UserManagement);
    }
}