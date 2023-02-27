using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.TimeTrack;
using Server.Types;
using Server.Utilities;

namespace Server.Validators;

public class UpdateTimeTrackInputModelValidator : AbstractValidator<UpdateTimeTrackInputModel>
{
    public UpdateTimeTrackInputModelValidator(
            ITimeTrackRepository timeTrackRepository, 
            IHttpContextAccessor accessor, 
            ITokenService tokenService
        )
    {
        RuleFor(x => x.Id)
            .NotNull()
            .Must(id =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
        
                var userClaims = tokenService.GetPrincipalClaims(accessToken);
                var adminId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));
                
                var currentTimeTrack = timeTrackRepository.GetById(id);
                
                return adminId == currentTimeTrack.UserId;
            }).WithMessage(ErrorMessages.Permissions)
            .Must(id => timeTrackRepository.GetById(id).EndDate != null)
            .WithMessage(ErrorMessages.UpdateUnstoppedTimeTrack);
        RuleFor(x => x.StartDate)
            .NotNull();
        RuleFor(x => x)
            .Must(track => track.TimeTrackTypeId == 1).WithMessage(ErrorMessages.Permissions);
        RuleFor(x => x)
            .Must(track =>
            {
                var currentTimeTrack = timeTrackRepository.GetById(track.Id);

                bool isTrackNotClosed = track.StartDate.Month >= DateTime.Now.Month;
                bool isCurrentTrackNotClosed = currentTimeTrack.StartDate.Month >= DateTime.Now.Month;
                
                return isTrackNotClosed && isCurrentTrackNotClosed;
            }).WithMessage(ErrorMessages.ClosedTimeTracks);
        When(x => x.EndDate != null, () =>
        {
            RuleFor(x => x.EndDate)
                .NotNull()
                .GreaterThanOrEqualTo(x => x.StartDate);
        });
    }
}