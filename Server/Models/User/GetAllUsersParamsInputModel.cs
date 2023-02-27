using Server.Models.Get;

namespace Server.Models.User;

public class GetAllUsersParamsInputModel
{
    public PaginationUsersInputModel Pagination { get; set; }
    
    public List<FilterUsersInputModel> Filters { get; set; }
    
    public List<SortUsersInputModel> Sort { get; set; }
    
    public SearchUsersInputModel Search { get; set; }
}