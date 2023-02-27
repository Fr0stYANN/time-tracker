using GraphQL;
using GraphQL.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types.Auth;
using Server.Interfaces;
using Server.Models.Auth;
using Server.Types;
using Server.Utilities;
using Server.Validators.Auth;
using Server.Validators.User;
using ValidationException = System.ComponentModel.DataAnnotations.ValidationException;

namespace Server.GraphQL.Mutations;

public class AuthMutations : ObjectGraphType
{
    public AuthMutations(
        IIdentityService identityService, 
        IHttpContextAccessor accessor,
        IAppModelsValidator validator,
        IUserRepository userRepository
        )
    {
        Field<AuthenticatedResponseGraphType>()
            .Name("login")
            .Description("Login user")
            .Argument<NonNullGraphType<LoginUserInputGraphType>>("LoginUserInput")
            .Resolve(context =>
            {
                var loginRequestUserModel = context.GetArgument<LoginUserRequestModel>("LoginUserInput");
                var userModel = userRepository.GetByEmail(loginRequestUserModel.Email);

                validator.Validate<int, UserActivatedValidator>(userModel.Id);
                validator.Validate<LoginUserRequestModel, LoginUserRequestModelValidator>(loginRequestUserModel);
                
                return identityService.Login(loginRequestUserModel);
            });

        Field<AuthenticatedResponseGraphType>()
            .Name("googleLogin")
            .Description("Login user with google api")
            .Argument<NonNullGraphType<LoginUserWithGoogleInputGraphType>>("loginUserWithGoogleInput")
            .Resolve(context =>
            {
                var loginModel = context.GetArgument<LoginUserWithGoogleModel>("loginUserWithGoogleInput");

                validator.Validate<LoginUserWithGoogleModel,LoginUserWithGoogleInputModelValidator>(loginModel);

                return identityService.LoginWithGoogle(loginModel);
            });

        Field<AuthenticatedResponseGraphType>()
            .Name("refresh")
            .Description("Generate new access and refresh tokens")
            .Argument<NonNullGraphType<StringGraphType>>("RefreshToken")
            .Resolve(context =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
                
                var refreshToken = context.GetArgument<string>("RefreshToken");
                validator.Validate<string, RefreshValidator>(refreshToken);
                
                return identityService.RefreshToken(accessToken, refreshToken);
            });

        Field<StringGraphType>()
            .Name("revoke")
            .Description("Remove refresh token from db")
            .Resolve(context =>
            {
                string? accessToken = accessor.HttpContext!.Request.Headers["Authorization"]
                    .ToString()
                    .Remove(0, 7);
                
                if (accessToken == null)
                {
                    throw new ValidationException("Access token not found into header");
                }
                
                identityService.RevokeToken(accessToken);

                return "Refresh token successfully revoked";
            })
            .AuthorizeWithPolicy(PolicyType.User);
    }
}