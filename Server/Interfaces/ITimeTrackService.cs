using System.Runtime.InteropServices;
using Server.Business.Entities;
using Server.Models.TimeTrack;

namespace Server.Interfaces;

public interface ITimeTrackService
{
    TimeTrackModel StartTimeTrack(int userId, int timeTrackTypeId = 1, int creationTypeId = 1);
    TimeTrackModel StopTimeTrack(int timeTrackId);
    TimeTrackModel UpdateTimeTrack(UpdateTimeTrackInputModel updateTimeTrackInputModel);
    TimeTrackModel Create(CreateTimeTrackInputModel createTimeTrackInputModel, int? creatorId = null);
}