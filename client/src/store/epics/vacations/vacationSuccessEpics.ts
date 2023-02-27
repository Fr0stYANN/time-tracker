import { getVacationsToApproveApiRequest } from 'store/slices/vacationSlice';
import { getRequestedVacationApiRequest } from 'store/slices/vacationSlice';
import { VacationType } from 'types/vacationTypes';
import { ApiActionEnum, VacationActionEnum } from 'enums/actionEnums';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, of } from 'rxjs';
import { setRequestedVacations, setVacationsToApprove, addRequestedVacation, setVacationApprovers, updateVacation } from 'store/slices/vacationSlice';
import { setNotification } from 'store/slices/notificationsSlice';
import { setLoading } from 'store/slices/loadingSlice';
import { User } from 'types/userTypes';

const createVacationApiSuccessEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.createVacation}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                addRequestedVacation(action.payload.data.vacation.create as VacationType),
                setNotification({
                    message: 'Success',
                    description: 'You have successfully requested vacation',
                    type: 'success'
                }),
                getRequestedVacationApiRequest(state$.value.user.id)
            );
        })
    )
}

const getVacationRequestsSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.getRequestedVacation}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                setRequestedVacations(action.payload.data.vacation.getByUserId as VacationType[]),
                setLoading({isSentVacationRequestsLoading: false})
            );
        })
    )
}

const getVacationsToApproveSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.getVacationsToApprove}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(setVacationsToApprove(action.payload.data.vacation.getNeedsToApprove as VacationType[]));
        })
    )
}

const approveVacationSuccessEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.approveVacation}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                setNotification({
                    message: 'Success',
                    description: 'You have successfully approved vacation',
                    type: 'success'    
                }),
                getVacationsToApproveApiRequest(state$.value.user.id)
            );
        })
    )
}

const getVacationApproversSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.getVacationApprovers}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(setVacationApprovers(action.payload.data.vacation.userApprovers as User[]));
        })
    )
}

const updateVacationSuccessEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.update}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                updateVacation(action.payload.data.vacation.update as VacationType),
                getRequestedVacationApiRequest(state$.value.user.id)
            );
        })
    )
}

const deleteVacationSuccessEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.delete}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                setNotification({
                    message: 'Success',
                    description: 'You have successfully deleted vacation',
                    type: 'success'    
                }),
                getRequestedVacationApiRequest(state$.value.user.id)
            );
        })
    )
}

const declineVacationSuccessEpic = (action$: any, state$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.decline}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return of(
                setNotification({
                    message: 'Success',
                    description: 'You have successfully declined vacation',
                    type: 'success'    
                }),
                getVacationsToApproveApiRequest(state$.value.user.id)
            );
        })
    )
}

export const vacationSuccessEpics = combineEpics(
    createVacationApiSuccessEpic,
    getVacationRequestsSuccessEpic, 
    getVacationsToApproveSuccessEpic, 
    approveVacationSuccessEpic,
    getVacationApproversSuccessEpic,
    updateVacationSuccessEpic,
    deleteVacationSuccessEpic,
    declineVacationSuccessEpic
);
