using GraphQL.Types;
using Server.Models.SickLeave;

namespace Server.GraphQL.Types.SickLeave
{
    public class UpdateSickLeaveInputGraphType : InputObjectGraphType<UpdateSickLeaveInputModel>
    {
        public UpdateSickLeaveInputGraphType()
        {
            Field(x => x.Id);
            Field<DateGraphType>("startDate");
            Field<DateGraphType>("endDate");
        }
    }
}
