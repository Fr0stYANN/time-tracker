using AutoMapper;
using Server.Business.Entities;

namespace Server.MSSQL.Mapper.Profiles;

public class VacationProfile : Profile
{
    public VacationProfile()
    {
        CreateMap<VacationModel, VacationDbModel>()
            .ForMember(dest => dest.UserId,
                opt => 
                    opt.MapFrom(source => source.User.Id));
    }
}