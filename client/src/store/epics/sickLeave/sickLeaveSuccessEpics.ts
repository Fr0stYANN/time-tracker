import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, SickLeavesActionEnum} from "../../../enums/actionEnums";
import {mergeMap, of, concat} from "rxjs";
import {addSickLeave, deleteSickLeave, editSickLeave, pushSickLeaves} from "../../slices/sickLeavesSlice";
import {setLoading} from "../../slices/loadingSlice";
import {SickLeaveType} from "../../../types/sickLeaveTypes";

const getSickLeaveByUserIdSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.getByUserId}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return concat(
               of(pushSickLeaves(action.payload.data.sickLeave.getAllByUserId as SickLeaveType[])),
               of(setLoading({isSickLeavesLoading: false}))
            );
        })
    );
}

const addSickLeaveSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.addSickLeave}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(addSickLeave(action.payload.data.sickLeave.create as SickLeaveType));
        })
    );
}

const editSickLeaveSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.editSickLeave}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(editSickLeave(action.payload.data.sickLeave.update as SickLeaveType));
        })
    );
}

const deleteSickLeaveSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${SickLeavesActionEnum.deleteSickLeave}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(deleteSickLeave(action.payload.data.sickLeave.delete as number));
        })
    );
}

const sickLeaveSuccessEpics = combineEpics(getSickLeaveByUserIdSuccessEpic, addSickLeaveSuccessEpic,
    editSickLeaveSuccessEpic, deleteSickLeaveSuccessEpic);
export default sickLeaveSuccessEpics;