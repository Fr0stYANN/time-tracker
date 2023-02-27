using System.Security.Claims;
using FluentValidation;
using Server.Interfaces;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.User;
public class UserIdValidator : AbstractValidator<int>
{
    public UserIdValidator(ITokenService tokenService, IHttpContextAccessor accessor)
    {
        RuleFor(id => id)
            .NotEmpty()
            .Must(id =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
        
                var userClaims = tokenService.GetPrincipalClaims(accessToken);
                int adminId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));

                return adminId != id;
            }).WithMessage(ErrorMessages.Permissions);
    }
}