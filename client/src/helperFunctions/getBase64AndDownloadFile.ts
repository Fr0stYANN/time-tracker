import download from "downloadjs";
import moment from "moment";
import { FileTypeEnum } from "store/slices/userListFilesSlice";
import { UsersListResponseType } from "types/userListFileTypes";

export function getBase64AndDownloadFile(data: UsersListResponseType){
    switch (data.fileType) {
        case FileTypeEnum.Pdf:
            download(atob(data.fileContent),
            `UserList-${moment().format("YYYY.MM.DD")}.pdf`,
            "application/pdf");
            break;
        case FileTypeEnum.Excel:
            download(atob(data.fileContent),
            `UserList-${moment().format("YYYY.MM.DD")}.xlsx`,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            break;
        default:
            break;
    }
}