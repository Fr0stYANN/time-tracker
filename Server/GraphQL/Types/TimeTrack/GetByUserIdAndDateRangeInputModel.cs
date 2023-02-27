using GraphQL.Types;
using Server.Models.TimeTrack;

namespace Server.GraphQL.Types.TimeTrack;

public class GetByUserIdAndDateRangeInputGraphType : InputObjectGraphType<GetByUserIdAndDateRangeInputModel>
{
    public GetByUserIdAndDateRangeInputGraphType()
    {
        Field(x => x.EndDate);
        Field(x => x.StartDate);
        Field(x => x.UserId);
    }
}