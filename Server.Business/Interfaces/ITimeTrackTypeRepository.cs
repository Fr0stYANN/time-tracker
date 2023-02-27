using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface ITimeTrackTypeRepository
{
    public List<TimeTrackTypeModel> GetAll();
    public TimeTrackTypeModel GetById(int id);
}