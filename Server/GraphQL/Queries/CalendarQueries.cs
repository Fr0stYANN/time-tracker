using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.Types;

namespace Server.GraphQL.Queries
{
    public class CalendarQueries : ObjectGraphType
    {
        public CalendarQueries(ICalendarRepository calendarRepository)
        {
            Field<ListGraphType<CalendarGraphType>>()
                .Name("getAll")
                .Description("Get All Calendar Days")
                .Resolve(context => calendarRepository.GetAll())
                .AuthorizeWithPolicy(PolicyType.User);

            Field<CalendarGraphType>()
                .Name("getById")
                .Description("Get calendar day by id")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");

                    return calendarRepository.GetById(id);
                })
                .AuthorizeWithPolicy(PolicyType.User);

            Field<CalendarGraphType>()
                .Name("getByDate")
                .Description("Get calendar day by date")
                .Argument<NonNullGraphType<DateGraphType>>("date")
                .Resolve(context =>
                {
                    var date = context.GetArgument<DateTime>("date");

                    
                    var calendarModel =  calendarRepository.GetByDate(date);
                    return calendarModel;
                })
                .AuthorizeWithPolicy(PolicyType.User);

            Field<ListGraphType<CalendarGraphType>>()
                .Name("getByRange")
                .Description("Get some calendar days by range")
                .Argument<NonNullGraphType<DateGraphType>>("startDate")
                .Argument<NonNullGraphType<DateGraphType>>("endDate")
                .Resolve(context =>
                {
                    var startDate = context.GetArgument<DateTime>("startDate");
                    var endDate = context.GetArgument<DateTime>("endDate");

                    return calendarRepository.GetByRange(startDate, endDate);
                })
                .AuthorizeWithPolicy(PolicyType.User);
        }
    }
}
