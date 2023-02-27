using AutoMapper;
using Server.Business.Entities;
using Server.MSSQL.Models;

namespace Server.MSSQL.Mapper.Profiles;

public class TimeTrackProfile : Profile
{
    public TimeTrackProfile()
    {
        CreateMap<TimeTrackModel, GetTimeTrackModel>().ReverseMap();
        CreateMap<TimeTrackModel, TimeTrackDbModel>()
            .ForMember(dest => dest.TimeTrackTypeId,
                opt => opt.MapFrom(source => source.TimeTrackType == null ? (int?)null : source.TimeTrackType.Id))
            .ForMember(dest => dest.CreationTypeId,
                opt => opt.MapFrom(source => source.CreationType == null ? (int?)null : source.CreationType.Id))
            .ReverseMap();
    }
}