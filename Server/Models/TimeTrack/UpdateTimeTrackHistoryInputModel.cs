namespace Server.Models.TimeTrack
{
    public class UpdateTimeTrackHistoryInputModel
    {
        public int EditorId { get; set; }
        public int TimeTrackId { get; set; }
        public DateTime Date { get; set; }
    }
}
