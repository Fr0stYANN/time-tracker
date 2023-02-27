using GraphQL.Types;
using Server.Models.Vacation;

namespace Server.GraphQL.Types.Vacation
{
    public class UpdateVacationInputGraphType : InputObjectGraphType<UpdateVacationModel>
    {
        public UpdateVacationInputGraphType()
        {
            Field(x => x.Id);
            Field(x => x.UserId);
            Field<DateGraphType>("startDate");
            Field<DateGraphType>("endDate");
            Field(x => x.Comment, nullable: true);
        }
    }
}
