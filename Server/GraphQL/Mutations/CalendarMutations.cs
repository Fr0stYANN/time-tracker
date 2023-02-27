using AutoMapper;
using GraphQL;
using GraphQL.Types;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.GraphQL.Types;
using Server.GraphQL.Types.Calendar;
using Server.Models.Calendar;
using Server.Types;
using Server.Utilities;
using System.Transactions;

namespace Server.GraphQL.Mutations;

public class CalendarMutations : ObjectGraphType
{
    public CalendarMutations(ICalendarRepository calendarRepository, IMapper mapper)
    {
        Field<ListGraphType<CalendarGraphType>>()
            .Name("insertRange")
            .Description("Insert Range of non-default days to calendar")
            .Argument<NonNullGraphType<InsertRangeCalendarInputGraphType>>("rangeCalendarInput")
            .Resolve(context =>
            {
                var inputRangeCalendarInput = context.GetValidatedArgument<RangeCalendarInputModel>("rangeCalendarInput");
                var calendarModels = UtilityCalendar.GetAllDates(inputRangeCalendarInput);
                
                var inputFirstDate = calendarModels.First();
                var inputLastDate = calendarModels.Last();

                var existingCalendarDaysFromInput = calendarRepository.GetByRange(inputFirstDate.Date, inputLastDate.Date);

                List<CalendarModel> calendarModelsToInsert = new List<CalendarModel>();

                foreach (var calendarModel in calendarModels)
                {
                    if (existingCalendarDaysFromInput.FirstOrDefault(calendar => calendar.Date == calendarModel.Date) != null)
                    {
                        continue;
                    }
                    calendarModelsToInsert.Add(calendarModel);
                }

                calendarRepository.CreateRange(calendarModelsToInsert);

                return calendarRepository.GetByRange(inputRangeCalendarInput.StartDate, inputRangeCalendarInput.EndDate);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.CalendarManagement);

        Field<CalendarGraphType>()
            .Name("insertSingle")
            .Description("Insert single non-default day to calendar")
            .Argument<NonNullGraphType<InsertSingleCalendarInputGraphType>>("singleCalendarInput")
            .Resolve(context =>
            {
                var singleCalendarInput = context.GetValidatedArgument<SingleCalendarInputModel>("singleCalendarInput");
                var calendarModel = mapper.Map<CalendarModel>(singleCalendarInput);

                var id = calendarRepository.CreateSingle(calendarModel);

                return calendarRepository.GetById(id);
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.CalendarManagement);

        Field<StringGraphType>()
            .Name("deleteById")
            .Description("Delete day from calendar by id")
            .Argument<NonNullGraphType<IntGraphType>>("id")
            .Resolve(context =>
            {
                var id = context.GetArgument<int>("id");
                calendarRepository.DeleteById(id);

                return "Day was successfully deleted";
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.CalendarManagement);

        Field<StringGraphType>()
            .Name("deleteByDate")
            .Description("Delete day from calendar by date")
            .Argument<NonNullGraphType<DateGraphType>>("date")
            .Resolve(context =>
            {
                var date = context.GetArgument<DateTime>("date");
                calendarRepository.DeleteByDate(date);

                return "Day was successfully deleted";
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.CalendarManagement);

        Field<StringGraphType>()
            .Name("update")
            .Description("Update day from calendar")
            .Argument<NonNullGraphType<UpdateCalendarInputGraphType>>("calendarDay")
            .Resolve(context =>
            {
                var calendarDay = context.GetValidatedArgument<UpdateCalendarInputModel>("calendarDay");
                var mappedCalendarDay = mapper.Map<CalendarModel>(calendarDay);

                calendarRepository.Update(mappedCalendarDay);

                return "Day was successfully edited";
            })
            .AuthorizeWithPolicy(PolicyType.User)
            .AuthorizeWithPolicy(PolicyType.CalendarManagement);
    }
}