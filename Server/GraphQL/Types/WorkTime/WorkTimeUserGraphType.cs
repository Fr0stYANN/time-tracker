using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types.WorkTime;

public class WorkTimeUserGraphType : ObjectGraphType<WorkTimeUserModel>
{
    public WorkTimeUserGraphType()
    {
        Field(x => x.WorkedMinutes);
        Field(x => x.TotalWorkHours);
    }
}