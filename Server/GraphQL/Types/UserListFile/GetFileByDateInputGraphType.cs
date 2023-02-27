using GraphQL;
using GraphQL.Types;
using Server.GraphQL.Types.User;
using Server.Models.User;

namespace Server.GraphQL.Types.UserListFile
{
    public class GetFileByDateInputGraphType : InputObjectGraphType<GetFileByDateInputModel>
    {
        public GetFileByDateInputGraphType()
        {
            Field<DateGraphType>("startDate");

            Field<DateGraphType>("endDate");

            Field<ListGraphType<FilterUsersInputGraphType>>("filters");

            Field<ListGraphType<SortUsersInputGraphType>>("sort");

            Field<SearchUsersInputGraphType>("search");

            Field<StringGraphType>("fileType");
        }
    }
}
