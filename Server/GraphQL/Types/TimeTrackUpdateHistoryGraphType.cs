using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class TimeTrackUpdateHistoryGraphType : ObjectGraphType<TimeTrackUpdateHistoryModel>
{
    public TimeTrackUpdateHistoryGraphType()
    {
        Field(x => x.Id, nullable: true);
        Field(x => x.TimeTrackId, nullable: true);
        Field<UserGraphType>("user");
        Field(x => x.Date, nullable: true);
    }
}