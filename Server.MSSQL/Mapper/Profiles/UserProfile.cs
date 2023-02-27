using AutoMapper;
using Server.Business.Entities;
using Server.MSSQL.Models;

namespace Server.MSSQL.Mapper.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserModel, UserDbModel>()
            .ForMember(dest => dest.WorkTypeId, 
                opt => 
                    opt.MapFrom(source => 
                        source.WorkType == null ? (int?)null : source.WorkType.Id));
    }
}