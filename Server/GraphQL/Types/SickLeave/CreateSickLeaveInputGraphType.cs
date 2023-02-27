using GraphQL.Types;
using Server.Models.SickLeave;

namespace Server.GraphQL.Types.SickLeave
{
    public class CreateSickLeaveInputGraphType : InputObjectGraphType<CreateSickLeaveInputModel>
    {
        public CreateSickLeaveInputGraphType()
        {
            Field(x => x.UserId);
            Field<DateGraphType>("startDate");
            Field<DateGraphType>("endDate");
        }
    }
}
