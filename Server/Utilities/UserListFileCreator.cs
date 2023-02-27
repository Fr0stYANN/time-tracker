using Server.Business.Interfaces;
using Server.Interfaces;
using Server.Services;
using Server.Types;

namespace Server.Utilities
{
    public class UserListFileCreator
    {
        public IUserListFilesService CreateUsersFileService(IWorkTimeRepository workTimeRepository,
            string fileType)
        {
            switch (fileType)
            {
                case FileType.Pdf:
                    return new PdfFilesService(workTimeRepository);

                case FileType.Excel:
                    return new ExcelFileService(workTimeRepository);

                default:
                    throw new InvalidDataException("No such file type for user list");
            }
        }
    }
}
