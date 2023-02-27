using System.Net;
using System.Security.Claims;
using System.Text;
using GraphQL;
using GraphQL.FluentValidation;
using GraphQL.Instrumentation;
using GraphQL.MicrosoftDI;
using GraphQL.Server;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Server.Business.Interfaces;
using Server.ErrorHandler;
using Server.GraphQL;
using Server.Interfaces;
using Server.MSSQL.Repositories;
using Server.Services;
using Server.Types;
using Server.Validators;
using Quartz;
using Server.Middleware;
using Server.Validators.TimeTrack;
using Server.Validators.Calendar;
using Server.Validators.Auth;
using Server.Validators.User;
using Server.Validators.Vacation;

namespace Server.Utilities;

public static class ServiceExtensions
{
    public static void AddAppServices(this IServiceCollection services)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddSingleton<ITokenRepository, TokenRepository>();
        services.AddSingleton<IUserRepository, UserRepository>();
        services.AddSingleton<ICalendarRepository, CalendarRepository>();
        services.AddSingleton<IDayTypeRepository, DayTypeRepository>();
        services.AddSingleton<IOptionRepository, OptionRepository>();
        services.AddSingleton<ITimeTrackRepository, TimeTrackRepository>();
        services.AddSingleton<ITimeTrackTypeRepository, TimeTrackTypeRepository>();
        services.AddSingleton<ITimeTrackUpdateHistoryRepository, TimeTrackUpdateHistoryRepository>();
        services.AddSingleton<IScheduledExecuteRepository, ScheduledExecuteRepository>();
        services.AddSingleton<IWorkTimeRepository, WorkTimeRepository>();
        services.AddSingleton<IVacationRepository, VacationRepository>();
        services.AddSingleton<ISickLeaveRepository, SickLeaveRepository>();

        services.AddSingleton<ITokenService, TokenService>();
        services.AddSingleton<IIdentityService, IdentityService>();
        services.AddSingleton<IEmailService, EmailService>();
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<ITimeTrackService, TimeTrackService>();
        services.AddSingleton<IVacationService, VacationService>();
        services.AddSingleton<IUserListFilesService, PdfFilesService>();
        services.AddSingleton<IUserListFilesService, ExcelFileService>();
        services.AddSingleton<TimeTracksScheduleService>();
        services.AddSingleton<DaysOffScheduleService>();
        services.AddSingleton<VacationDaysScheduleService>();
        services.AddSingleton<IWorkTimeService, WorkTimeService>();
    }

    public static void AddAppValidators(this IServiceCollection services)
    {
        services.AddSingleton<IAppModelsValidator, AppModelsValidator>();

        services.AddSingleton<LoginUserRequestModelValidator>();
        services.AddSingleton<RefreshValidator>();
        services.AddSingleton<LoginUserWithGoogleInputModelValidator>();

        services.AddSingleton<RangeCalendarInputModelValidator>();
        services.AddSingleton<SingleCalendarInputModelValidator>();
        services.AddSingleton<UpdateCalendarInputModelValidator>();

        services.AddSingleton<CreateTimeTrackForUserInputModelValidator>();
        services.AddSingleton<CreateTimeTrackInputModelValidator>();
        services.AddSingleton<DeleteTimeTrackForUserValidator>();
        services.AddSingleton<DeleteTimeTrackValidator>();
        services.AddSingleton<GetByRangeInputModelValidator>();
        services.AddSingleton<GetByUserIdAndDateRangeInputModelValidator>();
        services.AddSingleton<UpdateTimeTrackForUserInputModelValidator>();
        services.AddSingleton<UpdateTimeTrackInputModelValidator>();

        services.AddSingleton<CreateUserInputModelValidator>();
        services.AddSingleton<GetAllUsersParamsInputModelValidator>();
        services.AddSingleton<UpdateUserInputModelValidator>();
        services.AddSingleton<UserIdValidator>();

        services.AddSingleton<CreateVacationInputModelValidator>();
        services.AddSingleton<DeleteVacationValidator>();
        services.AddSingleton<UpdateVacationInputModelValidator>();
        
        services.AddSingleton<UserActivatedValidator>();
    }

    public static void AddAppAuthentication(this IServiceCollection services, WebApplicationBuilder builder, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            var key = builder.Configuration["Jwt:Key"];
            var audience = builder.Configuration["Jwt:Audience"];
            var issuer = builder.Configuration["Jwt:Issuer"];

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = audience,
                ValidIssuer = issuer,
                RequireSignedTokens = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

                    if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                    {
                        context.Response.Headers.Add("Token-Expired", "true");
                    }
                    else if (context.Exception.GetType() == typeof(SecurityTokenException))
                    {
                        context.Response.Headers.Add("Token-Invalid", "true");
                    }
                    else
                    {
                        context.Response.Headers.Add("Authorization-Failed", "true");
                    }

                    return Task.CompletedTask;
                }
            };
        })
        .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = configuration.GetValue<string>("Google:ClientId");
            googleOptions.ClientSecret = configuration.GetValue<string>("Google:ClientSecret");
        });
    }

    public static void AddAppAuthorization(this IServiceCollection services)
    {
        services.AddAuthorization(policyBuilder =>
        {
            policyBuilder.AddPolicy(PolicyType.User, policy => policy.RequireClaim(ClaimTypes.Email));
            policyBuilder.AddPolicy(PolicyType.PartTimeUser,
                policy => policy.RequireClaim(ClaimType.WorkType, "part-time"));

            foreach (var optionPolicy in PolicyType.UsersOptions)
            {
                policyBuilder.AddPolicy(optionPolicy.Key, authPolicyBuilder =>
                {
                    authPolicyBuilder.RequireAssertion(context =>
                    {
                        var optionsArray = context.User.FindAll(ClaimType.Options);
                        var option = optionsArray.SingleOrDefault(claim => claim.Value == optionPolicy.Value);

                        return option != null;
                    });
                });
            }
        });
    }

    public static void AddQuartzScheduler(this IServiceCollection services)
    {
        services.AddQuartz(config =>
        {
            config.UseMicrosoftDependencyInjectionScopedJobFactory();

            var timeTracksJobKey = new JobKey("TimeTracksDaily");
            var daysOffJobKey = new JobKey("DaysOffMonthly");
            var vacationDaysKey = new JobKey("VacationDaysDaily");

            config.AddJob<TimeTracksScheduleService>(opt => opt.WithIdentity(timeTracksJobKey));
            config.AddJob<DaysOffScheduleService>(opt => opt.WithIdentity(daysOffJobKey));
            config.AddJob<VacationDaysScheduleService>(opt => opt.WithIdentity(vacationDaysKey));

            config.AddTrigger(opts => opts
                .ForJob(timeTracksJobKey)
                .WithIdentity("DailyTimeTracks-Scheduler")
                .WithCronSchedule("0 0 0 ? * *"));

            config.AddTrigger(opts => opts
                .ForJob(daysOffJobKey)
                .WithIdentity("MonthlyDaysOff-Scheduler")
                .WithCronSchedule("0 0 12 1 * ?"));

            config.AddTrigger(opts => opts
                .ForJob(vacationDaysKey)
                .WithIdentity("DailyVacationDays-Scheduler")
                .WithCronSchedule("0 0 0 ? * *"));
        });

        services.AddQuartzHostedService(options =>
            options.WaitForJobsToComplete = true);
    }

    public static void AddAppGraphQlServer(this IServiceCollection services)
    {
        services.AddGraphQL(graph =>
            graph.ConfigureExecutionOptions(config =>
                {
                    var validatorCache = new ValidatorInstanceCache();
                    validatorCache.AddValidatorsFromAssemblyContaining<CreateUserInputModelValidator>();
                    config.UseFluentValidation(validatorCache);

                    #if !DEBUG
                        config.Schema?.FieldMiddleware.Use(new ErrorFieldMiddleware());
                    #endif
                })
                .AddHttpMiddleware<ISchema>()
                .AddGraphQLAuthorization()
                .AddSystemTextJson()
                .AddSchema<AppSchema>()
                .AddErrorInfoProvider<GraphQlErrorInfoProvider>()
                .AddGraphTypes(typeof(AppSchema).Assembly));
    }
}