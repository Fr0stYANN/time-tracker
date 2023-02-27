namespace Server.Interfaces
{
    public interface ITimeTracksScheduleService
    {
        void AutoCreateUncompletedTimeTracks();

        public void AutoCreateDailyTimeTracks();
    }
}
