using AutoMapper;
using Server.Business.Entities;
using Server.Models.User;

namespace Server.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserModel, CreateUserInputModel>()
                .ForMember(dest => dest.WorkTypeId, opt => opt.MapFrom(src => src.WorkType.Id))
                .ForMember(
                    dest => dest.Options,
                    opt => opt.MapFrom(src => src.Options!.Select(option => option.Id).ToList())
                )
                .ReverseMap();
            
            CreateMap<UserModel, UpdateUserInputModel>()
                .ForMember(dest => dest.WorkTypeId, opt => opt.MapFrom(src => src.WorkType.Id))
                .ForMember(
                    dest => dest.Options,
                    opt => opt.MapFrom(src => src.Options!.Select(option => option.Id).ToList())
                )
                .ReverseMap();
        }
    }
}