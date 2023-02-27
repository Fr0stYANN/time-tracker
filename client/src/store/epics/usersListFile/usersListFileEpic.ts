import {filter, mergeMap, of} from "rxjs";
import {UserListFileActionEnum, getUserListFileApiRequest} from "../../slices/userListFilesSlice";
import {apiRequestAction, CalendarActionEnum} from "../../slices/calendarDataSlice";
import {ApiRequestParamsType} from "../../../types/apiTypes";
import {getUserListFileQuery} from "../../../api/queries/userListFileQueries";
import {combineEpics} from "redux-observable";

const getUsersExcelFileEpic = (action$: any) => {
    return action$.pipe(
        filter(getUserListFileApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getUserListFileQuery(action.payload,
                    UserListFileActionEnum.getUserListFile)
            };

            return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
}

const excelFileEpic = combineEpics(getUsersExcelFileEpic);
export default excelFileEpic;