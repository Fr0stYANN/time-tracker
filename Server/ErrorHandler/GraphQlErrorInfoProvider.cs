using System.Net;
using GraphQL;
using GraphQL.Execution;

namespace Server.ErrorHandler;

public class GraphQlErrorInfoProvider : ErrorInfoProvider
{
    private readonly IHttpContextAccessor accessor;

    public GraphQlErrorInfoProvider(IHttpContextAccessor accessor)
    {
        this.accessor = accessor;
    }

    public override ErrorInfo GetInfo(ExecutionError executionError)
    {
        var info = base.GetInfo(executionError);

        switch (executionError.Code)
        {
            case "VALIDATION":
                accessor.HttpContext!.Response.StatusCode = (int) HttpStatusCode.UnprocessableEntity;
                break;
            case "INVALID_DATA":
                accessor.HttpContext!.Response.StatusCode = (int) HttpStatusCode.BadRequest;
                break;
            case "NULL_REFERENCE":
                accessor.HttpContext!.Response.StatusCode = (int) HttpStatusCode.BadRequest;
                break;
            case "authorization":
                accessor.HttpContext!.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                break;
            default:
                accessor.HttpContext!.Response.StatusCode = (int) HttpStatusCode.BadRequest;
                break;
        }

        return info;
    }
}