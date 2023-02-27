using GraphQL.Types;

namespace Server.GraphQL.Types.UserListFile
{
    public class UsersFileResponseGraphType : ObjectGraphType<UsersFileResponseType>
    {
        public UsersFileResponseGraphType()
        {
            Field(x => x.FileContent);
            Field(x => x.FileType);
        }
    }
}
