using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface ITokenRepository
{
    void Insert(RefreshTokenModel refreshTokenModel);
    
    RefreshTokenModel? GetByUserId(int userId);
    
    void RemoveByUserId(int userId);
    
    void Update(RefreshTokenModel refreshTokenModel);
}