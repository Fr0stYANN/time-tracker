using Server.Models.User;

namespace Server.GraphQL.Types.UserListFile
{
    public class GetFileByDateInputModel
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<FilterUsersInputModel> Filters { get; set; } = new List<FilterUsersInputModel>();

        public List<SortUsersInputModel> Sort { get; set; } = new List<SortUsersInputModel>();

        public SearchUsersInputModel Search { get; set; } = new SearchUsersInputModel();

        public string FileType { get; set; } = String.Empty;
    }
}
