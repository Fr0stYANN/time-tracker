using FluentValidation;

namespace Server.Validators.Auth;

public class AccessTokenValidator : AbstractValidator<string>
{
    public AccessTokenValidator()
    {
        RuleFor(x => x).NotEmpty();
    }
}