using GraphQL.Types;
using Server.Models.Vacation;

namespace Server.GraphQL.Types.Vacation;

public class CreateVacationGraphType : InputObjectGraphType<CreateVacationModel>
{
    public CreateVacationGraphType()
    {
        Field<IntGraphType>("userId");
        Field<DateGraphType>("startDate");
        Field<DateGraphType>("endDate");
        Field<StringGraphType>("comment");
    }
}