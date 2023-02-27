using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types
{
    public class CalendarGraphType : ObjectGraphType<CalendarModel>
    {
        public CalendarGraphType()
        {
            Field(x => x.Id);
            Field(x => x.HoursToWork, nullable: true);
            Field<DateGraphType>("date");
            Field<DayTypeGraphType>("dayType");
        }
    }
}