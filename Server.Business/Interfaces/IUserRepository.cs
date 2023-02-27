using Server.Business.Entities;

namespace Server.Business.Interfaces;

public interface IUserRepository
{
    int Create(UserModel userModel);

    UserModel? GetById(int userId);

    UserModel? GetByEmail(string email);

    IEnumerable<UserModel> GetAll(
        out int numRecordsUsers,
        PaginationModel? pagination = null,
        List<SortModel>? sort = null,
        List<FilterModel>? filter = null,
        SearchModel? search = null
    );

    void SetActivationStatus(int userId, bool isActivated);

    void Update(UserModel userModel);
    List<int> GetApproversIds(List<string> approversEmails);
}