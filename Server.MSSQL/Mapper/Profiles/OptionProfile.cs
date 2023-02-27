using AutoMapper;
using Server.Business.Entities;
using Server.MSSQL.Models;

namespace Server.MSSQL.Mapper.Profiles;

public class OptionProfile : Profile
{
    public OptionProfile()
    {
        CreateMap<OptionModel, OptionsUsersDbModel>()
            .ForMember(dest => dest.OptionId, opt => opt.MapFrom(src => src.Id))
            .ForMember(
                dest => dest.UserId,
                opt => opt.MapFrom((src, dest, destMember, context) => context.Items["UserId"])
            );
    }
}