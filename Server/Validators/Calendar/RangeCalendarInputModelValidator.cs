using FluentValidation;
using Server.Models.Calendar;

namespace Server.Validators.Calendar;

public class RangeCalendarInputModelValidator : AbstractValidator<RangeCalendarInputModel>
{
    public RangeCalendarInputModelValidator()
    {
        RuleFor(x => x.DayTypeId)
            .NotNull()
            .LessThanOrEqualTo(4)
            .GreaterThanOrEqualTo(2);

        RuleFor(x => x.StartDate)
            .NotNull();
            
        RuleFor(x => x.EndDate)
            .NotEqual(x => x.StartDate)
            .NotNull();

        When(x => x.DayTypeId == 3, () =>
        {
            RuleFor(x => x.HoursToWork)
                .NotNull()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(8);
        });
    }
}