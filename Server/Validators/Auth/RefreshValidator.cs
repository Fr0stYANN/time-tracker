using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.Auth;

public class RefreshValidator : AbstractValidator<string>
{
    public RefreshValidator(
            IHttpContextAccessor accessor,
            ITokenService tokenService,
            ITokenRepository tokenRepository
        )
    {
        RuleFor(x => x)
            .NotEmpty()
            .Must(refreshToken =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
                
                var userClaims = tokenService.GetPrincipalClaims(accessToken);
                int userId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));

                var currentRefreshToken = tokenRepository.GetByUserId(userId);

                bool isAccessTokenExists = accessToken != null!;
                bool isCurrentRefreshTokenExists = currentRefreshToken != null;
                bool isRefreshTokensMatch = refreshToken == currentRefreshToken?.Token;
                bool isRefreshTokenExpired = currentRefreshToken?.Expires <= DateTime.Now;

                return isAccessTokenExists && 
                       isCurrentRefreshTokenExists && 
                       isRefreshTokensMatch &&
                       isRefreshTokenExpired != true;
            }).WithMessage(ErrorMessages.MissingAccessToken);
    }
}