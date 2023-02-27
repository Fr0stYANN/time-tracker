using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.Auth;
using Server.Utilities;
using System.IdentityModel.Tokens.Jwt;

namespace Server.Validators.Auth
{
    public class LoginUserWithGoogleInputModelValidator : AbstractValidator<LoginUserWithGoogleModel>
    {
        public LoginUserWithGoogleInputModelValidator(IConfiguration configuration, IUserRepository userRepository)
        {
            RuleFor(x => x.ClientId)
                .NotEmpty();

            RuleFor(x => x.Credential)
                .NotEmpty();

            RuleFor(x => x)
                .NotEmpty()
                .Must(request =>
                {
                    string clientId = configuration.GetValue<string>("Google:ClientId");

                    return clientId == request.ClientId;
                })
                .WithMessage(ErrorMessages.ClientIdIsNotCorrect);

            RuleFor(x => x)
                .NotEmpty()
                .Must(request =>
                {
                    var decodedToken = IdentityUtilities.DecodeJwtToken(request.Credential);

                    long unixDateOfExpire = (long)decodedToken.Payload["exp"];

                    DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);

                    dtDateTime = dtDateTime.AddSeconds(unixDateOfExpire).ToUniversalTime();

                    return DateTime.UtcNow < dtDateTime;
                })
                .WithMessage(ErrorMessages.GoogleTokenIsOutOfDate);
            
            RuleFor(x => x)
                .NotEmpty()
                .Must(request =>
                {
                    var decodedToken = IdentityUtilities.DecodeJwtToken(request.Credential);

                    string email = (string)decodedToken.Payload["email"];

                    var user = userRepository.GetByEmail(email);

                    return user != null;
                })
                .WithMessage(ErrorMessages.UserDoestNotExist);
            
            RuleFor(x => x)
                .NotEmpty()
                .Must(request =>
                {
                    var decodedToken = IdentityUtilities.DecodeJwtToken(request.Credential);

                    string email = (string)decodedToken.Payload["email"];

                    var user = userRepository.GetByEmail(email);

                    return user?.IsActivated == true;
                })
                .WithMessage(ErrorMessages.UserIsNotActivated);
        }
    }
}
