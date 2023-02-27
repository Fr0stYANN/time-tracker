using GraphQL.Types;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class GetAllUsersParamsInputGraphType: InputObjectGraphType<GetAllUsersParamsInputModel>
{
    public GetAllUsersParamsInputGraphType()
    {
        Field<PaginationUsersInputGraphType>("pagination");
        
        Field<ListGraphType<FilterUsersInputGraphType>>("filters");
        
        Field<ListGraphType<SortUsersInputGraphType>>("sort");
        
        Field<SearchUsersInputGraphType>("search");
    }
}