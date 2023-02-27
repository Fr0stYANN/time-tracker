using iTextSharp.text;
using iTextSharp.text.pdf;
using Server.Business.Entities;

namespace Server.Utilities
{
    public static class PdfUtilities
    {
        public static void GeneratePdfRow(PdfPTable pdfTable, UsersTimeModel user, int allWorkTime)
        {
            GenerateCell(pdfTable, user.Firstname);
            GenerateCell(pdfTable, user.Lastname);
            GenerateCell(pdfTable, user.Email);
            GenerateCell(pdfTable, user.EmploymentDate.ToString("yyyy-MM-dd"));
            GenerateCell(pdfTable, Convert.ToString(Math.Round((double)user.WorkedTime / 60, 1)));
            GenerateCell(pdfTable, allWorkTime.ToString());
        }

        public static void GenerateHeaderCell(PdfPTable pdfTable, string content)
        {
            PdfPHeaderCell headerCell = new PdfPHeaderCell()
            {
                BackgroundColor = BaseColor.GREEN,
                HorizontalAlignment = Element.ALIGN_CENTER,
                Phrase = new Phrase(content)
            };

            pdfTable.AddCell(headerCell);
        }

        public static void GenerateCell(PdfPTable pdfTable, string content)
        {
            PdfPCell cell = new PdfPCell(new Phrase(content))
            {
                HorizontalAlignment = Element.ALIGN_LEFT,
                Padding = 5
            };

            pdfTable.AddCell(cell);
        }
    }
}
