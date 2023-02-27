using Server.Business.Entities;
using Server.Models.Vacation;

namespace Server.Interfaces;

public interface IVacationService
{
    void SetVacationDaysForUsers();
    VacationModel Create(VacationModel vacationModel);
    VacationModel Update(VacationModel vacationModel);
    string Delete(int id);
    string Approve(int id, string comment);
    string Decline(int id, string comment);
}