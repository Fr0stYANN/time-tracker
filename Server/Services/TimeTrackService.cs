using AutoMapper;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.TimeTrack;

namespace Server.Services;

public class TimeTrackService : ITimeTrackService
{
    private readonly ITimeTrackRepository timeTrackRepository;
    private readonly IMapper mapper;
    private readonly ITimeTrackUpdateHistoryRepository timeTrackUpdateHistoryRepository;

    public TimeTrackService(
        ITimeTrackRepository timeTrackRepository, 
        IMapper mapper,
        ITimeTrackUpdateHistoryRepository timeTrackUpdateHistoryRepository)
    {
        this.mapper = mapper;
        this.timeTrackRepository = timeTrackRepository;
        this.timeTrackUpdateHistoryRepository = timeTrackUpdateHistoryRepository;
    }

    public TimeTrackModel StartTimeTrack(int userId, int timeTrackTypeId = 1, int creationTypeId = 1)
    {
        var lastTimeTrack = timeTrackRepository.GetLastByUserId(userId);
        if (lastTimeTrack != null)
        {
            StopTimeTrack(lastTimeTrack.Id);
        }

        var timeTrackModel = new TimeTrackModel
        {
            UserId = userId,
            StartDate = DateTime.Now,
            TimeTrackType = {Id = timeTrackTypeId},
            CreationType = {Id = creationTypeId}
        };

        var timeTrackId = timeTrackRepository.Start(timeTrackModel);
        return timeTrackRepository.GetById(timeTrackId);
    }

    public TimeTrackModel StopTimeTrack(int id)
    {
        var timeTrack = timeTrackRepository.GetById(id);

        var newTimeTrack = mapper.Map<TimeTrackModel>(timeTrack);

        newTimeTrack.EndDate = DateTime.Now;
        var totalTime = newTimeTrack.EndDate - newTimeTrack.StartDate;
        newTimeTrack.TotalTime = $@"{(int) totalTime.Value.TotalHours}:{totalTime:mm\:ss}";

        timeTrackRepository.Stop(newTimeTrack);

        return timeTrackRepository.GetById(timeTrack.Id);
    }

    public TimeTrackModel UpdateTimeTrack(UpdateTimeTrackInputModel updateTimeTrackInputModel)
    {
        var timeTrackModel = mapper.Map<TimeTrackModel>(updateTimeTrackInputModel);

        var currentTimeTrack = timeTrackRepository.GetById(timeTrackModel.Id);

        var totalTime = timeTrackModel.EndDate - timeTrackModel.StartDate;
        timeTrackModel.TotalTime = $@"{(int) totalTime!.Value.TotalHours}:{totalTime:mm\:ss}";

        timeTrackRepository.Update(timeTrackModel);
        SetUpdateTimeTrackHistory(updateTimeTrackInputModel, currentTimeTrack);

        return timeTrackRepository.GetById(timeTrackModel.Id);
    }

    public TimeTrackModel Create(CreateTimeTrackInputModel createTimeTrackInputModel, int? creatorId = null)
    {
        var timeTrackModel = new TimeTrackModel
        {
            StartDate = createTimeTrackInputModel.StartDate,
            EndDate = createTimeTrackInputModel.EndDate,
            CreationType = {Id = createTimeTrackInputModel.CreationTypeId ?? 2},
            TimeTrackType = {Id = createTimeTrackInputModel.TimeTrackTypeId ?? 1},
            UserId = createTimeTrackInputModel.UserId
        };

        var totalTime = timeTrackModel.EndDate - timeTrackModel.StartDate;
        timeTrackModel.TotalTime = $@"{(int) totalTime.Value.TotalHours}:{totalTime:mm\:ss}";

        int id = timeTrackRepository.Create(timeTrackModel);

        if (creatorId != null)
        {
            timeTrackUpdateHistoryRepository.Add(creatorId, id, DateTime.Now);
        }

        return timeTrackRepository.GetById(id);
    }

    private void SetUpdateTimeTrackHistory(UpdateTimeTrackInputModel updateTimeTrackInputModel,
        TimeTrackModel timeTrack)
    {
        var timeTrackHistoryModel = timeTrackUpdateHistoryRepository.GetByTimeTrackId(timeTrack.Id);

        if (timeTrackHistoryModel == null && updateTimeTrackInputModel.UpdatorId == null)
        {
            timeTrackUpdateHistoryRepository.Add(timeTrack.UserId, timeTrack.Id, DateTime.Now);
        }
        else if (timeTrackHistoryModel == null && updateTimeTrackInputModel.UpdatorId != null)
        {
            timeTrackUpdateHistoryRepository.Add(updateTimeTrackInputModel.UpdatorId.Value, timeTrack.Id, DateTime.Now);
        }
        else if (timeTrackHistoryModel != null && updateTimeTrackInputModel.UpdatorId == null)
        {
            timeTrackUpdateHistoryRepository.Update(timeTrackHistoryModel.Id!.Value,
                timeTrack.UserId, timeTrack.Id, DateTime.Now);
        }
        else if (timeTrackHistoryModel != null && updateTimeTrackInputModel.UpdatorId != null)
        {
            timeTrackUpdateHistoryRepository.Update(timeTrackHistoryModel.Id!.Value,
                updateTimeTrackInputModel.UpdatorId.Value, timeTrack.Id, DateTime.Now);
        }
    }
}