namespace Server.Interfaces;

public interface IScheduledExecute
{
    void ExecuteScheduled();
    void ExecuteUncompleted();
}