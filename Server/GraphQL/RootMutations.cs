using GraphQL.Types;
using Server.GraphQL.Mutations;
using Server.GraphQL.Types;

namespace Server.GraphQL;

public class RootMutations : ObjectGraphType
{
    public RootMutations()
    {
        Field<AuthMutations>()
            .Name("Auth")
            .Resolve(context => new { });
            
        Field<UserMutations>()
            .Name("User")
            .Resolve(context => new { });

        Field<CalendarMutations>()
            .Name("Calendar")
            .Resolve(context => new { });

        Field<TimeTrackMutations>()
            .Name("TimeTrack")
            .Resolve(context => new { });

        Field<VacationMutations>()
            .Name("Vacation")
            .Resolve(context => new { });
        
        Field<SickLeaveMutations>()
            .Name("SickLeave")
            .Resolve(context => new { });
    }
}