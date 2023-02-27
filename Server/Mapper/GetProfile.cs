using AutoMapper;
using Server.Business.Entities;
using Server.Models.Get;
using Server.Models.User;

namespace Server.Mapper;

public class GetProfile : Profile
{
    public GetProfile()
    {
        CreateMap<PaginationUsersInputModel, PaginationModel>();
        CreateMap<FilterUsersInputModel, FilterModel>();
        CreateMap<SortUsersInputModel, SortModel>();
        CreateMap<SearchUsersInputModel, SearchModel>();
    }
}