using GraphQL.Types;
using Server.Mapper;
using Server.Utilities;

var builder = WebApplication.CreateBuilder(args);

const string corsSpecificOrigins = "CorsSpecificOrigins";
// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
    options.AddPolicy(corsSpecificOrigins,
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    )
);

builder.Services.AddAutoMapper(typeof(UserProfile), typeof(CalendarProfile), typeof(OptionProfile),
    typeof(GetProfile), typeof(TimeTrackProfile), typeof(VacationProfile));

builder.Services.AddAppServices();
builder.Services.AddAppValidators();

builder.Services.AddAppAuthentication(builder, builder.Configuration);
builder.Services.AddAppAuthorization();

builder.Services.AddAppGraphQlServer();

builder.Services.AddQuartzScheduler();

var app = builder.Build();

app.UseJobService();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(corsSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.UseGraphQL<ISchema>();
app.UseGraphQLAltair("/");
app.MapControllers();
app.Run();