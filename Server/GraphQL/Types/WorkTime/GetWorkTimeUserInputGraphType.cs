using GraphQL.Types;
using Server.Models.WorkTime;

namespace Server.GraphQL.Types.WorkTime;

public class GetWorkTimeUserInputGraphType : InputObjectGraphType<GetWorkTimeUserInputModel>
{
    public GetWorkTimeUserInputGraphType()
    {
        Field<IntGraphType>("userId");

        Field<DateGraphType>("startDate");

        Field<DateGraphType>("endDate");
    }
}