using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.TimeTrack;
using Server.Utilities;

namespace Server.Validators.TimeTrack;
public class UpdateTimeTrackForUserInputModelValidator : AbstractValidator<UpdateTimeTrackInputModel>
{
    public UpdateTimeTrackForUserInputModelValidator(ITimeTrackRepository timeTrackRepository)
    {
        RuleFor(x => x.Id)
            .NotNull()
            .Must(id => timeTrackRepository.GetById(id).EndDate != null)
            .WithMessage(ErrorMessages.UpdateUnstoppedTimeTrack);
        RuleFor(x => x.StartDate).NotNull();
        RuleFor(x => x.TimeTrackTypeId);
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