using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IDayTypeRepository
{
    List<DayTypeModel> GetAll();
    DayTypeModel GetById(int id);
}