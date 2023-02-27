using FluentValidation;
using Server.Models.Calendar;

namespace Server.Validators.Calendar;

public class SingleCalendarInputModelValidator : AbstractValidator<SingleCalendarInputModel>
{
    public SingleCalendarInputModelValidator()
    {
        RuleFor(x => x.DayTypeId)
            .NotNull()
            .GreaterThanOrEqualTo(2)
            .LessThanOrEqualTo(4);
            
        RuleFor(x => x.Date)
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