using Server.Interfaces;
using GraphQL.Types;
using GraphQL;
using Server.GraphQL.Types.UserListFile;
using Server.Business.Entities;
using AutoMapper;
using Server.Types;
using Server.Services;
using Server.Business.Interfaces;
using Server.Utilities;

namespace Server.GraphQL.Queries
{
    public class UserListFileQueries : ObjectGraphType
    {
        public UserListFileQueries(
            IMapper mapper,
            IWorkTimeRepository workTimeRepository
            )
        {
            Field<UsersFileResponseGraphType>()
                .Name("GetByRangeOfDate")
                .Argument<GetFileByDateInputGraphType>("Params")
                .Resolve(context =>
                {
                    var getAllUsersParamsInputModel =
                        context.GetValidatedArgument<GetFileByDateInputModel>("Params");

                    var startDate = getAllUsersParamsInputModel.StartDate;
                    var endDate = getAllUsersParamsInputModel.EndDate;
                    var listFilterModels = mapper.Map<List<FilterModel>>(getAllUsersParamsInputModel?.Filters);
                    var listSortModels = mapper.Map<List<SortModel>>(getAllUsersParamsInputModel?.Sort);
                    var searchModel = mapper.Map<SearchModel>(getAllUsersParamsInputModel?.Search);
                    var fileType = getAllUsersParamsInputModel?.FileType;

                    UserListFileCreator userListFileCreator = new UserListFileCreator();

                    IUserListFilesService userListFiles =
                        userListFileCreator.CreateUsersFileService(workTimeRepository, fileType);


                    return new UsersFileResponseType()
                    {
                        FileContent = userListFiles.GetUsersFile(
                                        startDate,
                                        endDate,
                                        listSortModels,
                                        listFilterModels,
                                        searchModel
                                     ),
                        FileType = fileType
                    };
                })
                .AuthorizeWithPolicy(PolicyType.User)
                .AuthorizeWithPolicy(PolicyType.UserManagement);
        }
    }
}