using FluentValidation;
using Server.Models.TimeTrack;

namespace Server.Validators;

public class GetByRangeInputModelValidator : AbstractValidator<GetByDateRangeInputModel>
{
    public GetByRangeInputModelValidator()
    {
        RuleFor(x => x.StartDate).NotNull();
        RuleFor(x => x.EndDate).NotNull()
            .GreaterThanOrEqualTo(x => x.StartDate);
    }
}