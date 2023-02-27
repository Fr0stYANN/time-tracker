using iTextSharp.text;
using iTextSharp.text.pdf;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;
using System.Text;
using Server.Utilities;

namespace Server.Services
{
    public class PdfFilesService : IUserListFilesService
    {
        private readonly IWorkTimeRepository workTimeRepository;

        public PdfFilesService(IWorkTimeRepository workTimeRepository)
        {
            this.workTimeRepository = workTimeRepository;
        }

        public string GetUsersFile(
            DateTime startDate,
            DateTime endDate,
            List<SortModel> sort,
            List<FilterModel> filter,
            SearchModel search
            )
        {
            var allWorkTime = workTimeRepository.GetWorkHoursByRangeDate(startDate, endDate);
            var users = workTimeRepository.GetUsersWithWorkTimeByDateRange(startDate, endDate, sort, filter, search);

            Byte[] byteArray = null;

            using (MemoryStream memoryStream = new MemoryStream())
            {
                Document doc = new Document(PageSize.A4, 25, 25, 30, 30);

                PdfWriter writer = PdfWriter.GetInstance(doc, memoryStream);

                doc.Open();

                Paragraph paragraph = new Paragraph();
                
                paragraph.Add("");

                doc.Add(paragraph);

                PdfPTable pdfTable = new PdfPTable(6);

                pdfTable.WidthPercentage = 98f;

                float[] widths = new float[] { 350, 360, 900, 500, 300, 300 };

                pdfTable.SetWidths(widths);

                string[] headerCellNameArray = new[] {"Firstname", "Lastname", "Email", "EmploymentDate",
                                                       "AllWorkedTime", "AllTime" }; 

                for (int i = 0; i < headerCellNameArray.Length; i++)
                {
                    PdfUtilities.GenerateHeaderCell(pdfTable, headerCellNameArray[i]);
                }

                foreach (var user in users)
                {
                    if (!user.IsActivated) continue;

                    PdfUtilities.GeneratePdfRow(pdfTable, user, allWorkTime);
                }

                doc.Add(pdfTable);

                doc.Close();

                writer.Close();

                byteArray = memoryStream.ToArray();
            }

            return System.Convert.ToBase64String(byteArray);
        }
    }
}
