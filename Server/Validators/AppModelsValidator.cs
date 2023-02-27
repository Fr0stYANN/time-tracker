using FluentValidation;
using Server.Interfaces;

namespace Server.Validators;

public class AppModelsValidator : IAppModelsValidator
{
    private readonly IServiceProvider serviceProvider;

    public AppModelsValidator(IServiceProvider serviceProvider)
    {
        this.serviceProvider = serviceProvider;
    }

    public void Validate<TModel, TValidator>(TModel model) where TValidator : notnull
    {
        var passedValidator = serviceProvider.GetRequiredService<TValidator>();

        if (passedValidator is AbstractValidator<TModel> validator)
        {
            validator.ValidateAndThrow(model);
            return;
        }

        throw new InvalidCastException();
    }
}