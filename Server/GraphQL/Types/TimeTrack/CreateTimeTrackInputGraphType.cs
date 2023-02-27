using GraphQL.Types;
using Server.Models.TimeTrack;

namespace Server.GraphQL.Types.TimeTrack
{
    public class CreateTimeTrackInputGraphType : InputObjectGraphType<CreateTimeTrackInputModel>
    {
        public CreateTimeTrackInputGraphType()
        {
            Field(x => x.StartDate);
            Field(x => x.EndDate);
            Field(x => x.UserId);
            Field(x => x.TimeTrackTypeId, nullable: true);
        }
    }
}
