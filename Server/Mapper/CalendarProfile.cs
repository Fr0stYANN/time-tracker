using AutoMapper;
using Server.Business.Entities;
using Server.Models.Calendar;

namespace Server.Mapper
{
    public class CalendarProfile : Profile
    {
        public CalendarProfile()
        {
            CreateMap<CalendarModel, SingleCalendarInputModel>()
                  .ForMember(dest => dest.DayTypeId, opt => opt.MapFrom(source => source.DayType.Id == null ? (int?)null : source.DayType.Id))
                  .ReverseMap();
            CreateMap<CalendarModel, UpdateCalendarInputModel>()
                  .ForMember(dest => dest.DayTypeId, opt => opt.MapFrom(source => source.DayType.Id == null ? (int?)null : source.DayType.Id))
                  .ReverseMap();
        }
    }
}
