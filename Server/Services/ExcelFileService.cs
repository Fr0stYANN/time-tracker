using OfficeOpenXml;
using OfficeOpenXml.Style;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.Interfaces;

namespace Server.Services
{
    public class ExcelFileService : IUserListFilesService
    {
        private readonly IWorkTimeRepository workTimeRepository;

        public ExcelFileService(IWorkTimeRepository workTimeRepository)
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

            byte[] byteOfFile;

            var stream = new MemoryStream();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(stream))
            {
                package.Workbook.Properties.Title = $"UserList-{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

                var workSheet = package.Workbook.Worksheets.Add("Users");

                workSheet.Cells[1, 1].Value = "FirstName";
                workSheet.Cells[1, 2].Value = "LastName";
                workSheet.Cells[1, 3].Value = "Email";
                workSheet.Cells[1, 4].Value = "EmploymentData";
                workSheet.Cells[1, 5].Value = "WorkedTime";
                workSheet.Cells[1, 6].Value = "AllTime";

                workSheet.Cells[1, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                workSheet.Cells[1, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                workSheet.Cells[1, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                workSheet.Cells[1, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                workSheet.Cells[1, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                workSheet.Cells[1, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                int row = 2;
                foreach (var user in users)
                {
                    if (!user.IsActivated) continue;

                    workSheet.Cells[row, 1].Value = user.Firstname;
                    workSheet.Cells[row, 2].Value = user.Lastname;
                    workSheet.Cells[row, 3].Value = user.Email;
                    workSheet.Cells[row, 4].Value = user.EmploymentDate.ToString("yyyy-MM-dd");
                    workSheet.Cells[row, 5].Value = Math.Round((double)user.WorkedTime / 60, 1);
                    workSheet.Cells[row, 6].Value = allWorkTime;

                    workSheet.Cells[row, 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    workSheet.Cells[row, 2].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    workSheet.Cells[row, 3].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    workSheet.Cells[row, 4].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    workSheet.Cells[row, 5].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    workSheet.Cells[row, 6].Style.Border.BorderAround(ExcelBorderStyle.Thin);

                    row++;
                }

                workSheet.Cells.AutoFitColumns();

                package.Save();
                byteOfFile = package.GetAsByteArray();
            }

            return System.Convert.ToBase64String(byteOfFile);
        }
    }
}