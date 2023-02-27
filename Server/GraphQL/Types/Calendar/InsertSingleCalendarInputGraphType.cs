using GraphQL.Types;
using Server.Business.Entities;
using Server.Models.Calendar;

namespace Server.GraphQL.Types.Calendar
{
    public class InsertSingleCalendarInputGraphType : InputObjectGraphType<SingleCalendarInputModel>
    {
        public InsertSingleCalendarInputGraphType()
        {
            Field<DateGraphType>("date");
            Field(x => x.DayTypeId);
            Field(x => x.HoursToWork, nullable: true);
        }
    }
}
