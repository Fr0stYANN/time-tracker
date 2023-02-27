using GraphQL.Types;
using Server.Business.Entities;

namespace Server.GraphQL.Types;

public class UserGraphType : ObjectGraphType<UserModel>
{
    public UserGraphType()
    {
        Field(user => user.Id);
        Field(user => user.Email);
        Field(user => user.Firstname);
        Field(user => user.Lastname);
        Field(user => user.VacationDays);
        Field(user => user.IsActivated);
        Field<DateGraphType>("employmentDate");
        Field<WorkTypeGraphType>("workType");
        Field<ListGraphType<OptionGraphType>>("options");
        //Field<PositionGraphType>("position");
    }
}