using AutoMapper;
using Server.Business.Entities;
using Server.Models.TimeTrack;

namespace Server.Mapper;

public class TimeTrackProfile : Profile
{
    public TimeTrackProfile()
    {
        CreateMap<TimeTrackModel, GetTimeTrackModel>().ReverseMap();
        CreateMap<TimeTrackModel, UpdateTimeTrackInputModel>()
            //.ForMember(dest => dest.TimeTrackTypeId, opt => opt.MapFrom(source => source.TimeTrackType.Id == null ? (int?)null : source.TimeTrackType.Id))
            .ReverseMap();
    }
}