using FluentValidation;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Models.Vacation;
using Server.Utilities;

namespace Server.Validators.Vacation
{
    public class UpdateVacationInputModelValidator : AbstractValidator<UpdateVacationModel>
    {
        public UpdateVacationInputModelValidator(IVacationRepository vacationRepository)
        {
            RuleFor(x => x.Id)
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
            
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.StartDate).NotEmpty();
            RuleFor(x => x.EndDate).NotEmpty();
            RuleFor(x => x)
                .NotEmpty()
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
                                                vacation.EndDate >= createVacationModel.StartDate && 
                                                vacation.Id != createVacationModel.Id;;
                
                            if (isIntersects) return false;
                        }
                    }

                    return true;
                }).WithMessage(ErrorMessages.AlreadyCreatedVacation);
            RuleFor(x => x.Comment);
        }
    }
}
