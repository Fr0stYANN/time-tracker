using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IPositionRepository
{
    PositionModel GetById(int id);
    
    IEnumerable<PositionModel> GetAll();
    
    int Create(PositionModel positionModel);
    
    void Update(PositionModel positionModel);
    
    void Delete(int id);
}