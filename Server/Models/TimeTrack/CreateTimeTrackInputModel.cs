namespace Server.Models.TimeTrack
{
    public class CreateTimeTrackInputModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? TimeTrackTypeId { get; set; }
        public int? CreationTypeId { get; set; }
        public int UserId { get; set; }
    }
}
