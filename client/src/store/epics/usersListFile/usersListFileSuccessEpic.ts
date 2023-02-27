import {filter, mergeMap, of} from "rxjs";
import {downloadUsersFile, getUserListFileApiSuccess} from "../../slices/userListFilesSlice";
import {combineEpics} from "redux-observable";
import { UsersListResponseType } from "types/userListFileTypes";

const getUsersFileSuccessEpic = (action$: any) => {
    return action$.pipe(
        filter(getUserListFileApiSuccess.match),
        mergeMap((action: any) => {
            let data = action.payload.data.usersListFiles.getByRangeOfDate
            return of(downloadUsersFile(data as UsersListResponseType));
        })
    );
}

const usersListFileSuccessEpics = combineEpics(getUsersFileSuccessEpic);
export default usersListFileSuccessEpics;
