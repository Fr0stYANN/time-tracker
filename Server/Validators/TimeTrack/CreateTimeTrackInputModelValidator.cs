using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.TimeTrack;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.TimeTrack
{
    public class CreateTimeTrackInputModelValidator : AbstractValidator<CreateTimeTrackInputModel>
    {
        public CreateTimeTrackInputModelValidator(
            ITimeTrackRepository timeTrackRepository,
            IHttpContextAccessor accessor, 
            ITokenService tokenService
            )
        {
            RuleFor(x => x.UserId).NotNull()
                .Must(userId =>
                {
                    string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                        .ToString()
                        .Remove(0, 7);
        
                    var userClaims = tokenService.GetPrincipalClaims(accessToken);
                    var adminId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));
                    
                    return userId == adminId;
                }).WithMessage(ErrorMessages.Permissions);
            RuleFor(x => x.StartDate).NotNull();
            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate)
                .NotNull();
            RuleFor(x => x)
                .Must(track => track.TimeTrackTypeId == null).WithMessage(ErrorMessages.Permissions);
            RuleFor(x => x)
                .Must(track =>
                {
                    var sameTimeTrack = timeTrackRepository.CheckForSameTimeTrack(
                        track.StartDate, 
                        track.EndDate, 
                        track.UserId
                    );

                    return sameTimeTrack == null;
                }).WithMessage(ErrorMessages.SameTimeTrack);
            RuleFor(x => x)
                .Must(track =>
                {
                    var timeTracksInValidation = timeTrackRepository.ValidateTimeTrack(
                        track.StartDate,
                        track.EndDate,
                        track.UserId
                    );

                    return timeTracksInValidation.Count == 0;
                }).WithMessage(ErrorMessages.InvalidTimeTrack);
            RuleFor(x => x)
                .Must(track => track.StartDate.Month >= DateTime.Now.Month).WithMessage(ErrorMessages.ClosedTimeTracks);
        }
    }
}
