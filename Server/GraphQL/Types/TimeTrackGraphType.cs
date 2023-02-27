using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class TimeTrackGraphType : ObjectGraphType<TimeTrackModel>
{
    public TimeTrackGraphType()
    {
        Field(x => x.Id);
        Field(x => x.StartDate, type: typeof(DateTimeGraphType));
        Field(x => x.EndDate, type: typeof(DateTimeGraphType), nullable: true);
        Field(x => x.UserId);
        Field<TimeTrackTypeGraphType>("timeTrackType");
        Field<CreationTypeGraphType>("creationType");
        Field<TimeTrackUpdateHistoryGraphType>("timeTrackUpdateHistory");
        Field<StringGraphType>("totalTime");
    }
}