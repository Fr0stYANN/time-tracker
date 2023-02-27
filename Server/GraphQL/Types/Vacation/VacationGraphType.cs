
using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types.Vacation;

public class VacationGraphType : ObjectGraphType<VacationModel>
{
    public VacationGraphType()
    {
        Field(vacation => vacation.Id);
        Field<DateGraphType>("startDate");
        Field<DateGraphType>("endDate");
        Field<UserGraphType>("user");
        Field(vacation => vacation.Comment, nullable: true);
        Field(vacation => vacation.IsApproved);
        Field<ListGraphType<ApproveRecordGraphType>>("approveRecords");
    }
}