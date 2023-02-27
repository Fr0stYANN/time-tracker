using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types.Vacation;

public class ApproveRecordGraphType : ObjectGraphType<ApproveRecordModel>
{
    public ApproveRecordGraphType()
    {
        Field(record => record.Id);
        Field<UserGraphType>("approver");
        Field(record => record.IsApproved, nullable: true);
        Field(record => record.Comment, nullable: true);
    }
}