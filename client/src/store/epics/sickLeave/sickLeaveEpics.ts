import {filter, mergeMap, of, concat} from 'rxjs';
import {
    addSickLeaveApiRequest, deleteSickLeaveApiRequest,
    editSickLeaveApiRequest,
    getSickLeavesByUserIdApiRequest
} from '../../actions/sickLeaveApiActions';
import {getSickLeavesByUserIdQuery} from '../../../api/queries/sickLeaveQueries';
import {SickLeavesActionEnum} from '../../../enums/actionEnums';
import {ApiRequestAction} from '../../actions/apiActions';
import {ApiRequestParamsType} from '../../../types/apiTypes';
import {addSickLeaveMutation, deleteSickLeaveMutation, editSickLeaveMutation} from "../../../api/mutations/sickLeaveMutations";
import {combineEpics} from "redux-observable";
import {setLoading} from "../../slices/loadingSlice";

const getSickLeavesByUserIdEpic = (action$: any) => {
    return action$.pipe(
        filter(getSickLeavesByUserIdApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getSickLeavesByUserIdQuery(action.payload, SickLeavesActionEnum.getByUserId)
            }

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isSickLeavesLoading: true}))
            );
        })
    );
}

const addSickLeaveEpic = (action$: any) => {
    return action$.pipe(
        filter(addSickLeaveApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...addSickLeaveMutation(action.payload, SickLeavesActionEnum.addSickLeave)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
}

const editSickLeaveEpic = (action$: any) => {
    return action$.pipe(
        filter(editSickLeaveApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...editSickLeaveMutation(action.payload, SickLeavesActionEnum.editSickLeave)
            }
            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
}

const deleteSickLeaveEpic = (action$: any) => {
    return action$.pipe(
        filter(deleteSickLeaveApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...deleteSickLeaveMutation(action.payload, SickLeavesActionEnum.deleteSickLeave)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
}

const sickLeaveEpics = combineEpics(getSickLeavesByUserIdEpic, addSickLeaveEpic,
    editSickLeaveEpic, deleteSickLeaveEpic);
export default sickLeaveEpics;