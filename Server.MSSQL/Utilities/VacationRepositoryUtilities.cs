using System.Data;
using Dapper;
using Server.Business.Entities;
using Server.MSSQL.Models;

namespace Server.MSSQL.Utilities;

public static class VacationRepositoryUtilities
{
    public static List<VacationModel> QueryUserVacations(this IDbConnection connection, string query, object param)
    {
        var userVacations = connection.Query<VacationModel, ApproveRecordModel, UserModel, 
            UserModel, VacationModel>(query,
            map: (vacationModel, approveVacationRecord, approverModel, userModel) =>
            {
                if (approverModel is not null)
                {
                    approveVacationRecord.Approver = approverModel;
                    vacationModel.ApproveRecords?.Add(approveVacationRecord);
                }
                
                vacationModel.User = userModel;
                
                return vacationModel;
            }, param: param);

        var vacationModels =  userVacations.GroupBy(u => u.Id)
            .Select(vacationGroup =>
        {
            var vacationModel = vacationGroup.First();
            
            if (vacationModel.ApproveRecords == null || !vacationModel.ApproveRecords.Any())
            {
                return vacationModel;
            }
            
            vacationModel.ApproveRecords = vacationGroup.Select(g => g.ApproveRecords!.Single()).ToList();

            return vacationModel;
        });

        return vacationModels.ToList();
    }
}