using GraphQL.Types;
using Server.Models.Calendar;

namespace Server.GraphQL.Types.Calendar
{
    public class InsertRangeCalendarInputGraphType : InputObjectGraphType<RangeCalendarInputModel>
    {
        public InsertRangeCalendarInputGraphType()
        {
            Field<DateGraphType>("startDate");
            Field<DateGraphType>("endDate");
            Field(x => x.DayTypeId);
            Field(x => x.HoursToWork, nullable: true);
        }
    }
}