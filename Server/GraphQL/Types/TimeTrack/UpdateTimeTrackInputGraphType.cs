using GraphQL.Types;
using Server.Models.TimeTrack;

namespace Server.GraphQL.Types.TimeTrack;

public class UpdateTimeTrackInputGraphType : InputObjectGraphType<UpdateTimeTrackInputModel>
{
    public UpdateTimeTrackInputGraphType()
    {
        Field(x => x.Id);
        Field(x => x.StartDate);
        Field(x => x.EndDate, nullable: true);
        Field(x => x.TimeTrackTypeId, nullable: true);
    }
}