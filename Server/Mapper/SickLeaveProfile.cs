using AutoMapper;
using Server.Business.Entities;
using Server.Models.SickLeave;

namespace Server.Mapper;

public class SickLeaveProfile : Profile
{
    public SickLeaveProfile()
    {
        CreateMap<CreateSickLeaveInputModel, SickLeaveModel>();
        CreateMap<UpdateSickLeaveInputModel, SickLeaveModel>();
    }
}