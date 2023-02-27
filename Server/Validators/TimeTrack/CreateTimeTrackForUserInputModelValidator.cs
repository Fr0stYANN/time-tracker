using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.TimeTrack;
using Server.Utilities;

namespace Server.Validators.TimeTrack;

public class CreateTimeTrackForUserInputModelValidator : AbstractValidator<CreateTimeTrackInputModel>
{
    public CreateTimeTrackForUserInputModelValidator(ITimeTrackRepository timeTrackRepository)
    {
        RuleFor(x => x.UserId)
            .NotEmpty();
        RuleFor(x => x.StartDate)
            .NotEmpty();
        RuleFor(x => x.EndDate)
            .GreaterThanOrEqualTo(x => x.StartDate)
            .NotEmpty();
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