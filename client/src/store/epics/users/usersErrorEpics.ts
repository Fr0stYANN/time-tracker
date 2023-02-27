import { combineEpics, ofType } from 'redux-observable';
import { ApiActionEnum, UsersActionEnum } from 'enums/actionEnums';
import { mergeMap, of } from 'rxjs';
import { setNotification } from 'store/slices/notificationsSlice';

const addUserErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.addUser}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                    message: 'An error occurred',
                    description: action.payload,
                    type: 'error' }
                ));
        })
    )
}

const updateUserErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.updateUser}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                    message: 'An error occurred',
                    description: action.payload,
                    type: 'error' }
                ));
        })
    )
}

const setActivationStatusErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.setActivationStatusUser}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                message: 'An error occurred',
                description: action.payload,
                type: 'error' }
            ));
        })
    )
}

const usersErrorEpics = combineEpics(addUserErrorEpic, updateUserErrorEpic, setActivationStatusErrorEpic);
export default usersErrorEpics;

