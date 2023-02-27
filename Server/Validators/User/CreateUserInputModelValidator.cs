using FluentValidation;
using Server.Business.Interfaces;
using Server.Models.User;
using Server.Utilities;

namespace Server.Validators;

public class CreateUserInputModelValidator : AbstractValidator<CreateUserInputModel>
{
    public CreateUserInputModelValidator(IUserRepository userRepository)
    {
        RuleFor(user => user.Firstname)
            .NotEmpty();
        RuleFor(user => user.Lastname)
            .NotEmpty();
        RuleFor(user => user.Email)
            .EmailAddress().WithMessage(ErrorMessages.IncorrectEmail)
            .Must(email =>
            {
                var userModelByEmailId = userRepository.GetByEmail(email);

                return userModelByEmailId == null;
            }).WithMessage(ErrorMessages.IncorrectEmail);
        RuleFor(user => user.EmploymentDate)
            .NotEmpty();
        RuleFor(user => user.WorkTypeId)
            .NotEmpty();
        RuleFor(user => user.VacationApprovers)
            .NotEmpty()
            .Must(approvers =>
            {
                var approversIds = userRepository.GetApproversIds(approvers);

                return approvers.Count == approversIds.Count;
            }).WithMessage(ErrorMessages.IncorrectEmail);
        RuleFor(x => x.Options);
    }
}