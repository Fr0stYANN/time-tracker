using AutoMapper;
using Server.Business.Entities;
using Server.Models.Vacation;

namespace Server.Mapper;

public class VacationProfile : Profile
{
    public VacationProfile()
    {
        CreateMap<VacationModel, CreateVacationModel>()
            .ForMember(dest => dest.UserId,
                opt =>
                    opt.MapFrom(source => source.User.Id)).ReverseMap();
        CreateMap<VacationModel, UpdateVacationModel>()
            .ForMember(dest => dest.UserId,
                opt =>
                    opt.MapFrom(source => source.User.Id)).ReverseMap();
    }
}