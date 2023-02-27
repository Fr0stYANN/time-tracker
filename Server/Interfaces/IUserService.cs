using Server.Business.Entities;

namespace Server.Interfaces;

public interface IUserService
{
    UserModel Create(UserModel userModel);
    
    UserModel Update(UserModel userModel);
}