using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IVacationRepository
{
    List<VacationModel> GetNeedsToApprove(int approverId);
    List<VacationModel> GetByUserId(int id);
    VacationModel GetById(int id);
    VacationModel? GetByUserIdAndDate(int userId, DateTime date);
    List<UserModel> GetUserApprovers(int userId);
    int Create(VacationModel vacationModel, TimeSpan vacationDays);
    void ApproveVacationRecord(int vacationRecordId, string? comment);
    void DeclineVacationRecord(int vacationRecordId, string? comment);
    void SetVacationDaysForUser(int userId, int days);
    void DeleteById(int id);
    void Update(VacationModel vacationModel);
    int GetCurrentUserVocationDays(int userId);
}