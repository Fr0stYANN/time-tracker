using GraphQL.Types;
using Server.Models.WorkTime;

namespace Server.GraphQL.Types.WorkTime;

public class WorkTimeDateModelGraphType : ObjectGraphType<WorkTimeDateModel>
{
    public WorkTimeDateModelGraphType()
    {
        Field<DateGraphType>("date");
        Field(x => x.WorkedMinutes);
    }
}