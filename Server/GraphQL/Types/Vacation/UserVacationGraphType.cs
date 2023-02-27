using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types.Vacation;

public class UserVacationGraphType : ObjectGraphType<UserVacationModel>
{
    public UserVacationGraphType()
    {
        Field<VacationGraphType>("vacation");
        Field<ListGraphType<ApproveRecordGraphType>>("approveRecords");
    }
}