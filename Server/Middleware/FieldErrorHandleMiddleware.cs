using FluentValidation;
using GraphQL;
using GraphQL.Instrumentation;

namespace Server.Middleware;

public class ErrorFieldMiddleware : IFieldMiddleware
{
    public async ValueTask<object?> ResolveAsync(IResolveFieldContext context, FieldMiddlewareDelegate next)
    {
        object? result = null;

        try
        {
            result = await next(context);
            return result;
        }
        catch (ArgumentNullException exception)
        {
            AddExecutionErrorToContext(exception.Message, "NULL_REFERENCE");
            return result;
        }
        catch (InvalidDataException exception)
        {
            AddExecutionErrorToContext(exception.Message, "INVALID_DATA");
            return result;
        }
        catch (ValidationException exception)
        {
            string messageError = string.Empty;

            if (exception.Errors.Any())
            {
                foreach (var error in exception.Errors)
                {
                    messageError += error.ErrorMessage + ' ';
                }

                messageError.TrimEnd();
            }
            else
            {
                messageError = exception.Message;
            }

            AddExecutionErrorToContext(messageError, "VALIDATION");
            return result;
        }

        void AddExecutionErrorToContext(string message, string code)
        {
            var executionError = new ExecutionError(message)
            {
                Code = code
            };
            
            context.Errors.Add(executionError);
        }
    }
}