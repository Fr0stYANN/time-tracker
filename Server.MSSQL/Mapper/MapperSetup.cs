using AutoMapper;
using Server.MSSQL.Mapper.Profiles;

namespace Server.MSSQL.Mapper;

public class MapperSetup
{
    public readonly IMapper Mapper;
    
    public MapperSetup()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<UserProfile>();
            cfg.AddProfile<CalendarProfile>();
            cfg.AddProfile<TimeTrackProfile>();
            cfg.AddProfile<OptionProfile>();
            cfg.AddProfile<VacationProfile>();
        });

        Mapper = config.CreateMapper();
    }
}