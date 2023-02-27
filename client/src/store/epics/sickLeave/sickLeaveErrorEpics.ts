import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, SickLeavesActionEnum} from "../../../enums/actionEnums";
import {mergeMap, of} from "rxjs";
import {setNotification} from "../../slices/notificationsSlice";

const addSickLeaveErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.addSickLeave}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                message: 'An error occurred',
                description: action.payload,
                type: 'error' }
            ));
        })
    );
}

const editSickLeaveErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.addSickLeave}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                message: 'An error occurred',
                description: action.payload,
                type: 'error' }
            ));
        })
    );
}

const sickLeavesErrorEpics = combineEpics(addSickLeaveErrorEpic, editSickLeaveErrorEpic);
export default sickLeavesErrorEpics;