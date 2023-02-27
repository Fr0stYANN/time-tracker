using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class CreationTypeGraphType : ObjectGraphType<CreationTypeModel>
{
    public CreationTypeGraphType()
    {
        Field(x => x.Id);
        Field(x => x.Name);
    }
}