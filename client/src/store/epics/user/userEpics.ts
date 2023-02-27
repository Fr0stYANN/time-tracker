import { loginUserApiRequest, loginUserWithGoogleApiRequest, refreshUserApiRequest, revokeUserApiRequest } from 'store/actions/userApiActions';
import { loginUserMutation, loginUserWithGoogleMutation, refreshUserMutation, revokeUserMutation } from 'api/mutations/userMutation';
import {concat, filter, mergeMap, of} from 'rxjs';
import { ApiRequestAction } from 'store/actions/apiActions';
import { ApiRequestParamsType } from 'types/apiTypes';
import { UserActionEnum } from 'enums/actionEnums';
import { combineEpics } from 'redux-observable';
import { setLoading } from '../../slices/loadingSlice';
import {removeUser} from "../../slices/userSlice";

const loginUserEpic = (action$: any) => {
    return action$.pipe(
        filter(loginUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...loginUserMutation(action.payload, UserActionEnum.loginUser)
            };

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isPageLoading: true}))
            );
        })
    )
}

const loginUserWithGoogleEpic = (action$: any) => {
    return action$.pipe(
        filter(loginUserWithGoogleApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...loginUserWithGoogleMutation(action.payload, UserActionEnum.loginGoogle)
            }

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isPageLoading: true}))
            );
        })
    )
}

const refreshUserEpic = (action$: any) => {
    return action$.pipe(
        filter(refreshUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...refreshUserMutation(action.payload, UserActionEnum.refreshUser)
            };

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isPageLoading: true}))
            );
        })
    )
}

const revokeUserEpic = (action$: any) => {
    return action$.pipe(
        filter(revokeUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...revokeUserMutation(
                action.payload.refreshToken,
                UserActionEnum.revokeUser)
            };

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isPageLoading: true})),
                of(removeUser())
            );
        })
    )
}

export const userEpics = combineEpics(refreshUserEpic, revokeUserEpic, loginUserEpic, loginUserWithGoogleEpic);
export default userEpics;
