using GraphQL.Types;
using Server.Models.WorkTime;

namespace Server.GraphQL.Types.WorkTime;

public class GetDailyWorkTimeUserInputGraphType : InputObjectGraphType<GetDailyWorkTimeUserInputModel>
{
    public GetDailyWorkTimeUserInputGraphType()
    {
        Field<IntGraphType>("userId");

        Field<DateGraphType>("startDate");

        Field<DateGraphType>("endDate");

        Field<BooleanGraphType>("isWeekendShows");
    }        
}