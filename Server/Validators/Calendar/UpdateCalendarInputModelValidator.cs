using FluentValidation;
using Server.Models.Calendar;

namespace Server.Validators.Calendar;

public class UpdateCalendarInputModelValidator : AbstractValidator<UpdateCalendarInputModel>
{
    public UpdateCalendarInputModelValidator()
    {
        RuleFor(x => x.Id).NotNull();
        RuleFor(x => x.Date).NotNull();
        RuleFor(x => x.DayTypeId)
            .NotNull()
            .LessThanOrEqualTo(4)
            .GreaterThanOrEqualTo(2);
            
        When(x => x.DayTypeId == 3, () =>
        {
            RuleFor(x => x.HoursToWork)
                .NotNull()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(8);
        });
    }
}