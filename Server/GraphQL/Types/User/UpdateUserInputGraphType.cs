using GraphQL.Types;
using Server.Models.User;

namespace Server.GraphQL.Types.User;

public class UpdateUserInputGraphType : InputObjectGraphType<UpdateUserInputModel>
{
    public UpdateUserInputGraphType()
    {
        Field<IntGraphType>("id");
        Field<StringGraphType>("email");
        Field<StringGraphType>("firstname");
        Field<StringGraphType>("lastname");
        Field<DateGraphType>("employmentDate");
        Field<IntGraphType>("workTypeId");
        Field<ListGraphType<IntGraphType>>("options");
        Field<ListGraphType<StringGraphType>>("vacationApprovers");
    }
}