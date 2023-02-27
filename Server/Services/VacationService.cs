using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;

namespace Server.Services;

public class VacationService : IVacationService
{
    private readonly IVacationRepository vacationRepository;
    private readonly IUserRepository userRepository;

    public VacationService(IVacationRepository vacationRepository, IUserRepository userRepository)
    {
        this.vacationRepository = vacationRepository;
        this.userRepository = userRepository;
    }

    public void SetVacationDaysForUsers()
    {
        var users = userRepository.GetAll(out var records).ToList();

        foreach (var user in users)
        {
            bool isLeapEmploymentYear = DateTime.IsLeapYear(user.EmploymentDate.Year);

            if (isLeapEmploymentYear)
            {
                bool isNotLeapPresentDay =
                    user.EmploymentDate.Month == DateTime.Now.Month &&
                    user.EmploymentDate.Day == 29 &&
                    DateTime.Now.Day == 28; // TODO: Think of better solution

                if (isNotLeapPresentDay)
                {
                    vacationRepository.SetVacationDaysForUser(user.Id, 30);
                    continue;
                }
            }

            bool isYearPassed =
                user.EmploymentDate.Month == DateTime.Now.Month &&
                user.EmploymentDate.Day == DateTime.Now.Day;

            if (isYearPassed)
            {
                vacationRepository.SetVacationDaysForUser(user.Id, 30);
            }
        }
    }

    public VacationModel Create(VacationModel vacationModel)
    {   
        var vacationId = vacationRepository.Create(vacationModel, 
            vacationModel.EndDate - vacationModel.StartDate);

        return vacationRepository.GetById(vacationId);
    }

    public VacationModel Update(VacationModel vacationModel)
    {
        vacationRepository.Update(vacationModel);
        return vacationRepository.GetById(vacationModel.Id);
    }

    public string Delete(int id)
    {
        vacationRepository.DeleteById(id);
        return $"Vacation with id {id} has been successfully deleted";
    }
    
    public string Approve(int vacationRecordId, string comment)
    {
        vacationRepository.ApproveVacationRecord(vacationRecordId, comment);
        return "Vacation approved";
    }

    public string Decline(int vacationRecordId, string comment)
    {
        vacationRepository.DeclineVacationRecord(vacationRecordId, comment);
        return "Vacation declined";
    }
}