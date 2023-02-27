using FluentValidation;
using Server.Business.Interfaces;
using Server.Utilities;

namespace Server.Validators.Vacation;
public class DeleteVacationValidator : AbstractValidator<int>
{
    public DeleteVacationValidator(IVacationRepository vacationRepository)
    {
        RuleFor(id => id)
            .NotEmpty()
            .Must(id =>
            {
                var vacation = vacationRepository.GetById(id);
                return !vacation.ApproveRecords.Any((x) => x.IsApproved != null);
            }).WithMessage(ErrorMessages.EditVacationWithFeedback)

            .Must(id =>
            {
                var vacation = vacationRepository.GetById(id);
                return vacation.IsApproved != true;
            }).WithMessage(ErrorMessages.EditAlreadyApprovedVacation);
    }
}