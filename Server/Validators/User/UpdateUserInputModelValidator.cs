using System.Security.Claims;
using FluentValidation;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Models.User;
using Server.Types;
using Server.Utilities;

namespace Server.Validators.User;

public class UpdateUserInputModelValidator : AbstractValidator<UpdateUserInputModel>
{
    public UpdateUserInputModelValidator(
        IUserRepository userRepository, 
        ITokenService tokenService, 
        IHttpContextAccessor accessor
        )
    {
        RuleFor(user => user.Id)
            .NotEmpty()
            .Must(id => userRepository.GetById(id) != null).WithMessage(ErrorMessages.NotFound)
            .Must(id =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
        
                var userClaims = tokenService.GetPrincipalClaims(accessToken);
                int adminId = Convert.ToInt32(userClaims.FindFirstValue(ClaimType.Id));

                return adminId != id;
            }).WithMessage(ErrorMessages.Permissions);
        RuleFor(user => user.Email)
            .NotEmpty()
            .EmailAddress()
            .Must((user, email) =>
            {
                var userModelByEmail = userRepository.GetByEmail(email);

                return userModelByEmail == null || user.Id == userModelByEmail?.Id;
            }).WithMessage(ErrorMessages.IncorrectEmail);
        RuleFor(user => user.Firstname).NotEmpty();
        RuleFor(user => user.Lastname).NotEmpty();
        RuleFor(user => user.EmploymentDate).NotEmpty();
        RuleFor(user => user.WorkTypeId).NotEmpty();
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