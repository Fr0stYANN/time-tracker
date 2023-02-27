using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Business.Entities
{
    public class TimeTrackModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeTrackTypeModel TimeTrackType { get; set; } = new TimeTrackTypeModel();
        public CreationTypeModel CreationType { get; set; } = new CreationTypeModel();
        public TimeTrackUpdateHistoryModel? TimeTrackUpdateHistory { get; set; } = new TimeTrackUpdateHistoryModel();
        public string? TotalTime { get; set; }
    }
}
