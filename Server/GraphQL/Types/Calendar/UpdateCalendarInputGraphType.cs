using GraphQL.Types;
using Server.Business.Entities;
using Server.Models.Calendar;

namespace Server.GraphQL.Types.Calendar
{
    public class UpdateCalendarInputGraphType : InputObjectGraphType<UpdateCalendarInputModel>
    {
        public UpdateCalendarInputGraphType()
        {
            Field(x => x.Id);
            Field(x => x.DayTypeId);
            Field(x => x.HoursToWork, nullable: true);
            Field<DateGraphType>("date");
        }
    }
}
