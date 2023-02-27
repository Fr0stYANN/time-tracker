using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.Vacation;
using Server.Utilities;

namespace Server.Validators.User;

public class CreateVacationInputModelValidator : AbstractValidator<CreateVacationModel>
{
    public CreateVacationInputModelValidator(IVacationRepository vacationRepository)
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.StartDate).NotEmpty();
        RuleFor(x => x.EndDate).NotEmpty();
        RuleFor(x => x)
            .Must(vacation =>
            {
                var vacationDays = vacation.EndDate - vacation.StartDate;

                return !(vacationDays.Days <= 0);
            }).WithMessage(ErrorMessages.InvalidRequestData)
            .Must(createVacationModel =>
            {
                var currentUserVacations = vacationRepository.GetByUserId(createVacationModel.UserId);

                if (currentUserVacations.Any())
                {
                    foreach (var vacation in currentUserVacations)
                    {
                        bool isIntersects = vacation.StartDate <= createVacationModel.EndDate && 
                                            vacation.EndDate >= createVacationModel.StartDate;
                
                        if (isIntersects) return false;
                    }
                }

                return true;
            }).WithMessage(ErrorMessages.AlreadyCreatedVacation);
        RuleFor(x => x.Comment);
    }
}