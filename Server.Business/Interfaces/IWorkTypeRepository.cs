using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IWorkTypeRepository
{
    WorkTypeModel? GetById(int id);
    
    IEnumerable<WorkTypeModel> GetAll();
    
    int Create(WorkTypeModel workTypeModel);
    
    void Update(WorkTypeModel workTypeModel);
    
    void Delete(int id);
}