using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface ISickLeaveRepository
{
    IEnumerable<SickLeaveModel>? GetAllByUserId(int userId);
    
    SickLeaveModel? GetById(int id);
    
    SickLeaveModel? GetByUserIdAndDate(int userId, DateTime date);
    
    int Create(SickLeaveModel sickLeaveModel);
    
    void Update(SickLeaveModel sickLeaveModel);
    
    void Delete(int id);
}