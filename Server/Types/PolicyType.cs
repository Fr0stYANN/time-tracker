namespace Server.Types;

public static class PolicyType
{
    public const string User = "UserPolicy";
    public const string PartTimeUser = "PartTimeUserPolicy";
    public const string UserManagement = "UserManagementPolicy";
    public const string CalendarManagement = "CalendarManagementPolicy";
    public const string WorkTimeManagement = "WorkTimeManagementPolicy";
    public static readonly Dictionary<string, string> UsersOptions = new ()
    {
        { UserManagement, UserOptionCode.UserManagement },
        { CalendarManagement, UserOptionCode.CalendarManagement },
        { WorkTimeManagement, UserOptionCode.WorkTimeManagement },
    };
}