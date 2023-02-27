using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class OptionGraphType : ObjectGraphType<OptionModel>
{
    public OptionGraphType()
    {
        Field(workType => workType.Id);
        Field(workType => workType.Name);
        Field(workType => workType.Code);
    }
}