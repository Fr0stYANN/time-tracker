using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IScheduledExecuteRepository
{
    DateTime? GetDateByName(string name);

    void UpdateDateByName(string name, DateTime date);
    
    void ClearDateByName(string name);
    
    void Insert(string name, DateTime? date);
}