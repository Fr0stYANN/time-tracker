using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.User;
public class UserActivatedValidator : AbstractValidator<int>
{
    public UserActivatedValidator(IUserRepository userRepository)
    {
        RuleFor(id => id)
            .NotEmpty()
            .Must(id =>
            {
                var userModel = userRepository.GetById(id);
                return userModel?.IsActivated == true;
            }).WithMessage(ErrorMessages.UserIsNotActivated);
    }
}