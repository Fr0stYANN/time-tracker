using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.TimeTrack;

public class DeleteTimeTrackForUserValidator : AbstractValidator<int>
{
    public DeleteTimeTrackForUserValidator(ITimeTrackRepository timeTrackRepository)
    {
        RuleFor(x => x)
            .NotEmpty()
            .Must(id =>
            {
                var timeTrack = timeTrackRepository.GetById(id);
                return timeTrack.StartDate.Month >= DateTime.Now.Month;
            }).WithMessage(ErrorMessages.ClosedTimeTracks);
    }
}