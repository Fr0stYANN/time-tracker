using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IOptionRepository 
{
    OptionModel? GetById(int id);
    
    OptionModel? GetByCode(string code);

    IEnumerable<OptionModel> GetAll();

    IEnumerable<OptionModel> GetAllByUserId(int userId);
    
    void AddToUser(int userId, int optionId);
    
    void RevokeFromUser(int userId, int optionId);

    void RemoveAllForUserId(int userId);

    void AddListForUserId(IEnumerable<OptionModel> optionModels, int userId);
}