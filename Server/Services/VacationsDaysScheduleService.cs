using System.Transactions;
using Quartz;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Types;

namespace Server.Services;

public class VacationDaysScheduleService : IJob
{
    private readonly IUserRepository userRepository;
    private readonly IScheduledExecuteRepository scheduleRepository;
    private readonly IVacationRepository vacationRepository;

    public VacationDaysScheduleService(
        IUserRepository userRepository,
        IScheduledExecuteRepository scheduleRepository,
        IVacationRepository vacationRepository)
    {
        this.userRepository = userRepository;
        this.scheduleRepository = scheduleRepository;
        this.vacationRepository = vacationRepository;
    }
    public Task Execute(IJobExecutionContext context)
    {
        ExecuteScheduled();
        return Task.CompletedTask;
    }
    public void ExecuteScheduled()
    {
        AutoAddVacationDays(DateTime.Today);
    }

    public void ExecuteUncompleted()
    {
        var dateSuccessfulExecution = scheduleRepository.GetDateByName(Schedule.VacationDays);

        if (dateSuccessfulExecution == null) return;

        var intermediateDate = dateSuccessfulExecution.Value.AddDays(1);

        while (intermediateDate <= DateTime.Today)
        {
            AutoAddVacationDays(intermediateDate);

            intermediateDate = intermediateDate.AddDays(1);
        }
    }

    private void AutoAddVacationDays(DateTime date)
    {
        using var transactionScope = new TransactionScope();

        var users = userRepository.GetAll(out _);

        foreach (var user in users)
        {
            if (!user.IsActivated) continue;
            
            if (IsDateSameEmploymentDate(date, user.EmploymentDate))
            {
                vacationRepository.SetVacationDaysForUser(user.Id, 30);
            }
        }
        
        scheduleRepository.UpdateDateByName(Schedule.VacationDays, date);
        transactionScope.Complete();
    }

    private bool IsDateSameEmploymentDate(DateTime date, DateTime employmentDate)
    {
        bool isLeapYear = DateTime.IsLeapYear(date.Year);

        if (isLeapYear)
        {
            bool isNotLeapPresentDay =
                employmentDate.Month == date.Month
                && employmentDate.Day == 29
                && date.Day == 28;
            // TODO: Think of better solution

            if (isNotLeapPresentDay)
            {
                return true;
            }
        }

        bool isYearPassed =
            date.Month == employmentDate.Month
            && date.Day == employmentDate.Day;

        return isYearPassed;
    }
}