using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types
{
    public class DayTypeGraphType : ObjectGraphType<DayTypeModel>
    {
        public DayTypeGraphType()
        {
            Field(x => x.Id);
            Field(x => x.Name);
        }
    }
}
