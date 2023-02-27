using FluentValidation;
using Server.Models.TimeTrack;

namespace Server.Validators;

public class GetByUserIdAndDateRangeInputModelValidator : AbstractValidator<GetByUserIdAndDateRangeInputModel>
{
    public GetByUserIdAndDateRangeInputModelValidator()
    {
        RuleFor(x => x.StartDate).NotNull();
        RuleFor(x => x.EndDate).NotNull()
            .GreaterThanOrEqualTo(x => x.StartDate);
        RuleFor(x => x.UserId)
            .NotNull();
    }
}