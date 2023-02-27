using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class TimeTrackTypeGraphType : ObjectGraphType<TimeTrackTypeModel>
{
    public TimeTrackTypeGraphType()
    {
        Field(x => x.Id);
        Field(x => x.Name);
    }
}

