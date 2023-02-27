using System.Data;
using Dapper;
using Server.Business.Entities;

namespace Server.MSSQL.Utilities;

public static class UserRepositoryUtilities
{
    internal static IEnumerable<UserModel> QueryUsers(this IDbConnection connection, string query, object param)
    {
        var user = connection.Query<UserModel, WorkTypeModel, OptionModel, UserModel>(query,
            (user, workType, option) =>
            {
                user.WorkType = workType;

                if (option != null)
                {
                    user.Options?.Add(option);
                }

                return user;
            }, splitOn: "Id", param: param);

        var userModels = user.GroupBy(u => u.Id).Select(userGroup =>
        {
            var userModel = userGroup.First();

            if (userModel.Options == null || !userModel.Options.Any())
            {
                return userModel;
            }

            userModel.Options = userGroup.Select(g => g.Options!.Single()).ToList();

            return userModel;
        });

        return userModels;
    }
}