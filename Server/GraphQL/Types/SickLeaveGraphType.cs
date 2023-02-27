using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class SickLeaveGraphType : ObjectGraphType<SickLeaveModel>
{
    public SickLeaveGraphType()
    {
        Field(sickLeave => sickLeave.Id);
        Field<DateGraphType>("startDate");
        Field<DateGraphType>("endDate");
        Field(sickLeave => sickLeave.UserId);
    }
}