using GraphQL.Types;
using GraphQL;
using Server.Business.Entities;
using Server.Types;
using Server.Business.Interfaces;
using Server.GraphQL.Types.WorkTime;
using Server.Interfaces;
using Server.Models.WorkTime;

namespace Server.GraphQL.Queries
{
    public class WorkTimeQueries : ObjectGraphType
    {
        public WorkTimeQueries(IWorkTimeRepository workTimeRepository, IWorkTimeService workTimeService)
        {
            Field<WorkTimeUserGraphType>()
                .Name("GetWorkTimeUserByRangeOfDate")
                .Argument<GetWorkTimeUserInputGraphType>("Params")
                .Resolve(context =>
                {
                    var getWorkTimeUserModel = context.GetValidatedArgument<GetWorkTimeUserInputModel>("Params");

                    var userId = getWorkTimeUserModel.UserId;
                    var startDate = getWorkTimeUserModel.StartDate;
                    var endDate = getWorkTimeUserModel.EndDate.AddDays(1).AddSeconds(-1);

                    var userWorkedMinutes = workTimeRepository.GetUserWorkedMinutesByDateRange(userId, startDate, endDate);
                    var workTime = workTimeRepository.GetWorkHoursByRangeDate(startDate, endDate);

                    return new WorkTimeUserModel
                    {
                        WorkedMinutes = userWorkedMinutes,
                        TotalWorkHours = workTime
                    };
                })
                .AuthorizeWithPolicy(PolicyType.User);
            
            Field<ListGraphType<WorkTimeDateModelGraphType>>()
                .Name("GetDailyWorkTimeUserByRangeOfDate")
                .Argument<GetDailyWorkTimeUserInputGraphType>("Params")
                .Resolve(context =>
                {
                    var getDailyWorkTimeUserInputModel = context.GetValidatedArgument<GetDailyWorkTimeUserInputModel>("Params");
                    getDailyWorkTimeUserInputModel.EndDate = getDailyWorkTimeUserInputModel.EndDate.AddDays(1).AddSeconds(-1);
                    
                    return workTimeService.GetDailyWorkTimeByUserIdAndDates(getDailyWorkTimeUserInputModel);
                })
                .AuthorizeWithPolicy(PolicyType.User);
        }
    }
}
