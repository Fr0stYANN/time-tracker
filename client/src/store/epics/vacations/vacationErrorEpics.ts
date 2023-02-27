import { combineEpics } from 'redux-observable';
import { mergeMap, of } from 'rxjs';
import { VacationActionEnum, ApiActionEnum } from 'enums/actionEnums';
import { ofType } from 'redux-observable';
import { setNotification } from 'store/slices/notificationsSlice';
import {setLoading} from "../../slices/loadingSlice";

const createVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.createVacation}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {

            return of(setNotification({
                message: 'An error occurred',
                description: action.payload,
                type: 'error'
             }));
        })
    )
}

const getRequestedVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.getRequestedVacation}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {

            return of(
                setNotification({
                    message: 'An error occurred',
                    description: action.payload,
                    type: 'error'
                }),
                setLoading({isPageLoading: false})
            );
        })
    )
}

const getVacationsToApproveApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.getVacationsToApprove}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            
            return of(setNotification({
                message: 'An error occurred',
                description: action.payload,
                type: 'error'
            }),
            setLoading({isPageLoading: false}));
        })
    )
}

const approveVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.approveVacation}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {

            return of(
                setNotification({
                    message: 'An error occured',
                    description: action.payload,
                    type: 'error'
                }),
                setLoading({isPageLoading: false})
            );
        })
    )
}

const updateVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.update}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(
                setNotification({
                    message: 'An error occured',
                    description: action.payload,
                    type: 'error'
                }),
                setLoading({isPageLoading: false})
            )    
        })
    )
}

const deleteVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.delete}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(
                setNotification({
                    message: 'An error occured',
                    description: action.payload,
                    type: 'error'
                }),
                setLoading({isPageLoading: false})    
            )
        })
    )
}

const declineVacationApiErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${VacationActionEnum.decline}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(
                setNotification({
                    message: 'An error occured',
                    description: action.payload,
                    type: 'error'
                }),
                setLoading({isPageLoading: false})    
            );
        })
    )
}

const vacationErrorEpics = combineEpics(
    createVacationApiErrorEpic, 
    getRequestedVacationApiErrorEpic, 
    getVacationsToApproveApiErrorEpic, 
    approveVacationApiErrorEpic,
    updateVacationApiErrorEpic,
    deleteVacationApiErrorEpic,
    declineVacationApiErrorEpic
);

export default vacationErrorEpics;