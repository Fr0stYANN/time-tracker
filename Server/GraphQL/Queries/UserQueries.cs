using AutoMapper;
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
using Server.Validators.User;

namespace Server.GraphQL.Queries;

public class UserQueries : ObjectGraphType
{
    public UserQueries(IUserRepository userRepository, IMapper mapper, IAppModelsValidator validator)
    {
        Field<ListUsersWithNumRecordsGraphType>()
            .Name("GetAll")
            .Description("Get list of users with pagination, sort, filter and search")
            .Argument<GetAllUsersParamsInputGraphType>("Params")
            .Resolve(context =>
            {
                var getAllUsersParamsInputModel = context.GetArgument<GetAllUsersParamsInputModel>("Params");
                validator.Validate<GetAllUsersParamsInputModel, GetAllUsersParamsInputModelValidator>(getAllUsersParamsInputModel);
                
                var paginationModel = mapper.Map<PaginationModel>(getAllUsersParamsInputModel?.Pagination);
                var listFilterModels = mapper.Map<List<FilterModel>>(getAllUsersParamsInputModel?.Filters);
                var listSortModels = mapper.Map<List<SortModel>>(getAllUsersParamsInputModel?.Sort);
                var searchModel = mapper.Map<SearchModel>(getAllUsersParamsInputModel?.Search);

                var usersList = userRepository.GetAll(
                    out var numRecordsUsers,
                    paginationModel,
                    listSortModels,
                    listFilterModels,
                    searchModel
                );

                return new
                {
                    Records = numRecordsUsers,
                    Users = usersList
                };
                
            })
            .AuthorizeWithPolicy(PolicyType.User);

        Field<UserGraphType>()
            .Name("GetById")
            .Description("Get user by id")
            .Argument<NonNullGraphType<IntGraphType>>("Id")
            .Resolve(context =>
            {
                var userId = context.GetArgument<int>("Id");
                return userRepository.GetById(userId);
            })
            .AuthorizeWithPolicy(PolicyType.User);
        
        Field<UserGraphType>()
            .Name("GetByEmail")
            .Description("Get user by email")
            .Argument<NonNullGraphType<StringGraphType>>("Email")
            .Resolve(context =>
            {
                var email = context.GetArgument<string>("Email");
                return userRepository.GetByEmail(email);
            })
            .AuthorizeWithPolicy(PolicyType.User);
    }
}