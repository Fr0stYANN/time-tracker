
using Server.Services;

namespace Server.Utilities;

public static class WebApplicationExtensions
{
    public static void UseJobService(this WebApplication app)
    {
        app.Lifetime.ApplicationStarted.Register(() =>
        {
            var timeTracksScheduleService = app.Services.GetRequiredService<TimeTracksScheduleService>();
            var daysOffScheduleService = app.Services.GetRequiredService<DaysOffScheduleService>();
            var vacationDaysScheduleService = app.Services.GetRequiredService<VacationDaysScheduleService>();

            timeTracksScheduleService.ExecuteUncompleted();
            daysOffScheduleService.ExecuteUncompleted();
            vacationDaysScheduleService.ExecuteUncompleted();
        });
    }
}