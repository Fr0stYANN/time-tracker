using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.MSSQL.Models
{
    public class CalendarDbModel
    {
        public int? Id { get; set; }
        public DateTime? Date { get; set; }
        public int DayTypeId { get; set; }
        public int? HoursToWork { get; set; }
    }
}
