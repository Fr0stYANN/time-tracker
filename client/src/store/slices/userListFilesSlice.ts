import {createAction, createSlice} from "@reduxjs/toolkit";
import {GetUserListFileParametersType} from "../../types/userListFileTypes";
import {getBase64AndDownloadFile} from "../../helperFunctions/getBase64AndDownloadFile";

const userListFileSlice = createSlice({
    name: "userListFileSlice",
    initialState: "",
    reducers: {
        downloadUsersFile:(state, action) => {
            getBase64AndDownloadFile(action.payload);
        }
    }
});

export const { downloadUsersFile } = userListFileSlice.actions;

export const getUserListFileApiRequest = createAction<GetUserListFileParametersType>("userListFile/getUsers/api/request");
export const getUserListFileApiSuccess = createAction("userListFile/getUsers/api/success");

export const enum UserListFileActionEnum{
    getUserListFile = 'userListFile/getUsers'
}

export const enum ApiActionEnum {
    apiRequest = '/api/request',
    apiSuccess = '/api/success'
}

export const enum FileTypeEnum {
    Pdf = "PDF",
    Excel = "EXCEL"
}

export default userListFileSlice;