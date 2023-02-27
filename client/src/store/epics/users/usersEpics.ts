import {concat, filter, mergeMap, of} from 'rxjs';
import {combineEpics} from 'redux-observable';

import {ApiRequestAction} from 'store/actions/apiActions';
import {
    addUserApiRequest,
    setActivationStatusUserApiRequest,
    getUserByIdApiRequest,
    getUsersApiRequest,
    updateUserApiRequest
} from 'store/actions/userApiActions';

import {getUserByIdQuery, getUsersQuery} from 'api/queries/usersQueries';
import {addUserMutation, setActivationStatusUserMutation, updateUserMutation} from 'api/mutations/usersMutation';

import {setLoading} from 'store/slices/loadingSlice';

import {UsersActionEnum} from 'enums/actionEnums';
import {ApiRequestParamsType} from 'types/apiTypes';

const getUsersEpic = (action$: any) => {
    return action$.pipe(
        filter(getUsersApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getUsersQuery(action.payload, UsersActionEnum.getUsers)
            };
            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType),
                setLoading({isUsersLoading: true}));
        })
    );
};

const getUserByIdEpic = (action$: any) => {
    return action$.pipe(
        filter(getUserByIdApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getUserByIdQuery(action.payload, UsersActionEnum.getUserById)
            };

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isEditUserLoading: true}))
            );
        })
    )
}

const addUserEpic = (action$: any) => {
    return action$.pipe(
        filter(addUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...addUserMutation(action.payload, UsersActionEnum.addUser)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const updateUserEpic = (action$: any) => {
    return action$.pipe(
        filter(updateUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...updateUserMutation(action.payload, UsersActionEnum.updateUser)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const setActivationStatusUserEpic = (action$: any) => {
    return action$.pipe(
        filter(setActivationStatusUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...setActivationStatusUserMutation(action.payload, UsersActionEnum.setActivationStatusUser)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const usersEpics = combineEpics(getUsersEpic, addUserEpic, updateUserEpic, setActivationStatusUserEpic, getUserByIdEpic);
export default usersEpics;
