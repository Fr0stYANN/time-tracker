using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.Auth;
using Server.Utilities;

namespace Server.Validators.Auth;

public class LoginUserRequestModelValidator : AbstractValidator<LoginUserRequestModel>
{
    public LoginUserRequestModelValidator(IUserRepository userRepository)
    {
        RuleFor(x => x.Password)
            .NotEmpty();
        RuleFor(x => x.Email)
            .NotEmpty();
        RuleFor(x => x)
            .NotEmpty()
            .Must(request =>
            {
                var user = userRepository.GetByEmail(request.Email);
                
                return user != null && 
                        BCrypt.Net.BCrypt.Verify(
                            request.Password, 
                            user.Password
                        );
            })
            .WithMessage(ErrorMessages.IncorrectLoginData);
    }
}