using AutoMapper;
using Server.Business.Entities;
using Server.MSSQL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.MSSQL.Mapper.Profiles
{
    public class CalendarProfile : Profile
    {
        public CalendarProfile()
        {
            CreateMap<CalendarModel, CalendarDbModel>()
                .ForMember(dest => dest.DayTypeId, opt => opt.MapFrom(source => source.DayType == null ? (int?)null : source.DayType.Id))
                .ReverseMap();
        }
    }
}
