using GraphQL.Types;
using Server.GraphQL.Queries;

namespace Server.GraphQL;

public class RootQueries : ObjectGraphType
{
    public RootQueries()
    {
        Field<TestQueries>()   
            .Name("Test")
            .Resolve(context => new { });

        Field<CalendarQueries>()
            .Name("Calendar")
            .Resolve(context => new { });

        Field<DayTypeQueries>()
            .Name("DayType")
            .Resolve(context => new { });

        Field<UserQueries>()
            .Name("User")
            .Resolve(context => new { });

        Field<TimeTrackQueries>()
            .Name("TimeTrack")
            .Resolve(context => new { });
        
        Field<TimeTrackTypeQueries>()
            .Name("TimeTrackType")
            .Resolve(context => new { });
        
        Field<OptionQueries>()
            .Name("Option")
            .Resolve(context => new { });

        Field<UserListFileQueries>()
            .Name("UsersListFiles")
            .Resolve(context => new { });

        Field<VacationQueries>()
            .Name("Vacation")
            .Resolve(context => new { });

        Field<WorkTimeQueries>()
            .Name("WorkTime")
            .Resolve(context => new { });
        
        Field<SickLeaveQueries>()
            .Name("SickLeave")
            .Resolve(context => new { });
    }
}