namespace Server.Utilities;

public static class ErrorMessages
{
    public const string Permissions = "You don't have permissions for this request";
    public const string InvalidTimeTrack = "Input dates are invalid";
    public const string SameTimeTrack = "Same timetrack is already exists";
    public const string ClosedTimeTracks = "You can't edit timetracks in closed months";
    public const string IncorrectLoginData = "Incorrect email or password";
    public const string MissingAccessToken = "Access token not found into header";
    public const string UpdateUnstoppedTimeTrack = "You can`t update current time track, at first stop it";
    public const string IncorrectEmail = "Incorrect email";
    public const string NotFound = "Not found";
    public const string InvalidRequestData = "Invalid data";
    public const string AlreadyCreatedVacation = "Vacation Request already created during this period of time";
    public const string EditAlreadyApprovedVacation = "You can't edit or delete already approved vacation request";
    public const string EditVacationWithFeedback = "You can't edit or delete vacation request with feedback";
    public const string ClientIdIsNotCorrect = "ClientId is not correct, you are trying to authorize from another app";
    public const string GoogleTokenIsOutOfDate = "Your token is expired, try get a new one!";
    public const string UserDoestNotExist = "User does not exist in our application";
    public const string UserIsNotActivated = "User account is not activated";
}