import {mergeMap, of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';

import {ApiActionEnum, UsersActionEnum} from 'enums/actionEnums';

import {User} from 'types/userTypes';
import {setLoading} from 'store/slices/loadingSlice';
import {setNotification} from 'store/slices/notificationsSlice';
import {addUser, pushUsers, changeActivationStatusUser, setEditUser, updateUser} from 'store/slices/usersSlice';

import {browserHistory} from 'utils/browserHistory';
import {Path} from 'utils/path';

const getUsersSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.getUsers}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(pushUsers(action.payload.data.user.getAll),
                setLoading({isUsersLoading: false}));
        })
    )
}

const getUserByIdSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.getUserById}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(setEditUser(action.payload.data.user.getById as User),
                setLoading({isEditUserLoading: false}));
        })
    )
}

const addUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.addUser}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(
                addUser(action.payload.data.user.create as User),
                setNotification({
                    message: 'User was added',
                    description: null,
                    type: 'success'
                })
            );
        })
    )
}

const updateUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.updateUser}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            browserHistory.replace(Path.USERS);

            return of(updateUser(action.payload.data.user.update as User),
                setNotification({
                    message: 'Changes saved',
                    description: null,
                    type: 'success'
                }));
        })
    )
}

const setActivationStatusUserSuccess = (action$: any) => {
    return action$.pipe(
        ofType(`${UsersActionEnum.setActivationStatusUser}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(
                changeActivationStatusUser(action.payload.data.user.setActivationStatus as number),
                setNotification({
                    message: 'Activation status changed',
                    description: null,
                    type: 'success'
                })
            );
        })
    )
}

const usersSuccessEpics = combineEpics(
    getUsersSuccessEpic,
    addUserSuccessEpic,
    updateUserSuccessEpic,
    setActivationStatusUserSuccess,
    getUserByIdSuccessEpic
);

export default usersSuccessEpics;
