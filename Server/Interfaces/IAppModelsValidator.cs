namespace Server.Interfaces;

public interface IAppModelsValidator
{
    void Validate<TModel, TValidator>(TModel model) where TValidator : notnull;
}