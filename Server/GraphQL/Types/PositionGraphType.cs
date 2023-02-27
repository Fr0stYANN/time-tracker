using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class PositionGraphType : ObjectGraphType<PositionModel>
{
    public PositionGraphType()
    {
        Field(workType => workType.Id);
        Field(workType => workType.Name);
    }
}