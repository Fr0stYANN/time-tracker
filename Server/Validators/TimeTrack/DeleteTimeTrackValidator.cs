using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.TimeTrack;
public class DeleteTimeTrackValidator : AbstractValidator<int>
{
    public DeleteTimeTrackValidator(
        IHttpContextAccessor accessor, 
        ITokenService tokenService,
        ITimeTrackRepository timeTrackRepository)
    {
        RuleFor(x => x).NotEmpty()
            .Must(id =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
        
                var userClaims = tokenService.GetPrincipalClaims(accessToken);
                var adminId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));

                var timeTrack = timeTrackRepository.GetById(id);

                return timeTrack.UserId == adminId;
            }).WithMessage(ErrorMessages.Permissions);
        RuleFor(x => x)
            .Must(id =>
            {
                var timeTrack = timeTrackRepository.GetById(id);
                return timeTrack.StartDate.Month >= DateTime.Now.Month;
            }).WithMessage(ErrorMessages.ClosedTimeTracks);
    }
}