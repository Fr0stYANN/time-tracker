import { combineEpics } from 'redux-observable';
import { ApiRequestParamsType } from './../../../types/apiTypes';
import { ApiRequestAction } from './../../actions/apiActions';
import { approveVacationMutation, createVacationMutation, declineVacationMutation, deleteVacationMutation, updateVacationMutation } from "api/mutations/vacationMutations"
import { VacationActionEnum } from "enums/actionEnums"
import { filter, mergeMap, of } from "rxjs"
import { approveVacationApiRequest, createVacationApiRequest, declineVacationApiRequest, deleteVacationApiRequest, getRequestedVacationApiRequest, getVacationApproversApiRequest, getVacationsToApproveApiRequest, updateVacationApiRequest } from "store/slices/vacationSlice";
import { getRequestedVacationQuery, getUserVacationApprovers, getVacationsToApproveQuery } from 'api/queries/vacationQueries';
import { setLoading } from 'store/slices/loadingSlice';

const createVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(createVacationApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...createVacationMutation(action.payload, VacationActionEnum.createVacation)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const getRequestedVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(getRequestedVacationApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getRequestedVacationQuery(action.payload, VacationActionEnum.getRequestedVacation)
            };

            return of(
                ApiRequestAction(apiRequestParams as ApiRequestParamsType), 
                setLoading({isSentVacationRequestsLoading: true})
            );
        })
    )
}

const getVacationsToApproveEpic = (action$: any) => {
    return action$.pipe(
        filter(getVacationsToApproveApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getVacationsToApproveQuery(action.payload, VacationActionEnum.getVacationsToApprove)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const approveVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(approveVacationApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...approveVacationMutation(action.payload, VacationActionEnum.approveVacation)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const declineVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(declineVacationApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...declineVacationMutation(action.payload, VacationActionEnum.decline)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const getVacationApproversEpic = (action$: any) => {
    return action$.pipe(
        filter(getVacationApproversApiRequest.match),
        mergeMap((action: any) => {

            const apiRequestParams = {
                ...getUserVacationApprovers(action.payload, VacationActionEnum.getVacationApprovers)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const updateVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(updateVacationApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...updateVacationMutation(action.payload, VacationActionEnum.update)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const deleteVacationEpic = (action$: any) => {
    return action$.pipe(
        filter(deleteVacationApiRequest.match),
        mergeMap((action: any) => {

            const apiRequestParams = {
                ...deleteVacationMutation(action.payload, VacationActionEnum.delete)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

export const vacationEpics = combineEpics(
    createVacationEpic,
    getRequestedVacationEpic,
    getVacationsToApproveEpic,
    approveVacationEpic,
    getVacationApproversEpic,
    updateVacationEpic,
    deleteVacationEpic,
    declineVacationEpic
);