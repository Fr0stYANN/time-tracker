using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class WorkTypeGraphType : ObjectGraphType<WorkTypeModel>
{
    public WorkTypeGraphType()
    {
        Field(workType => workType.Id);
        Field(workType => workType.Name);
    }
}