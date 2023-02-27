using System.Security.Cryptography;
using BCrypt.Net;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.Email;
using Server.Utilities;


namespace Server.Services;

public class UserService : IUserService
{
    private readonly IUserRepository userRepository;
    private readonly IEmailService emailService;

    public UserService(IUserRepository userRepository, IEmailService emailService)
    {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public UserModel Create(UserModel userModel)
    {
        // var generatedPassword = RandomUtilities.GenerateRandomString(12);
        var generatedPassword = "1111"; // For demo version of time tracker
        var generatedHashedPassword = BCrypt.Net.BCrypt.HashPassword(generatedPassword);

        userModel.Password = generatedHashedPassword;

        int createdUserId = userRepository.Create(userModel);
        var createdUserModel = userRepository.GetById(createdUserId)!;

        var emailModel = new EmailModel()
        {
            To = userModel.Email,
            Subject = "TimeTracker",
            Body = $@"
                <div 
                    style='
                        width: 600px;
                        color: white;
                        font-size: 1px;
                    '
                >
                    <div style='background-color: #009dff; padding: 20px 0; text-align: center; font-size: 18px;'>TIME TRACKER</div>
                    <div style='background-color: #030303; font-size: 14px; padding: 15px 20px;'>
                        Your password for authorization in system: 
                        <span style='padding: 5px 7px; border: 1px solid #fff; display: inline-block; margin-left: 5px'>{generatedPassword}</span>
                    </div>
                </div>
            ",
        };

        emailService.Send(emailModel);

        return createdUserModel;
    }

    public UserModel Update(UserModel userModel)
    {
        userRepository.Update(userModel);
        return userRepository.GetById(userModel.Id)!;
    }
}