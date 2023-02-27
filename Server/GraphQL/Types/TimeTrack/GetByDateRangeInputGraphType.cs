using GraphQL.Types;
using Server.Models.TimeTrack;

namespace Server.GraphQL.Types.TimeTrack;

public class GetByDateRangeInputGraphType : InputObjectGraphType<GetByDateRangeInputModel>
{
    public GetByDateRangeInputGraphType()
    {
        Field(x => x.EndDate);
        Field(x => x.StartDate);
    }
}