import { mergeMap, of, concat } from 'rxjs';
import { removeUser, setUser } from '../../slices/userSlice';
import { ApiActionEnum, UserActionEnum } from '../../../enums/actionEnums';
import { setLoading } from '../../slices/loadingSlice';
import { removeAuthTokens } from '../../../helperFunctions/removeAuthTokens';
import { setAuthTokens } from '../../../helperFunctions/setAuthTokens';
import { User } from '../../../types/userTypes';
import { combineEpics, ofType } from 'redux-observable';

const revokeUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.revokeUser}${ApiActionEnum.apiSuccess}`),
        mergeMap(() => {
            removeAuthTokens();

            return concat(
                of(setLoading({isPageLoading: false}))
            );
        })
    )
}

const refreshUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.refreshUser}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const authData = action.payload.data.auth.refresh;
            setAuthTokens(authData);

            return concat(
                of(setUser(authData.user as User)),
                of(setLoading({isPageLoading: false, isAuthLoaded: true}))
            );
        })
    )
}

const loginUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.loginUser}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const authData = action.payload.data.auth.login;
            setAuthTokens(authData);

            return concat(
                of(setUser(authData.user as User)),
                of(setLoading({isPageLoading: false}))
            );
        })
    )
}

const loginUserWithGoogleSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.loginGoogle}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const authData = action.payload.data.auth.googleLogin;

            setAuthTokens(authData);

            return concat(
                of(setUser(authData.user as User)),
                of(setLoading({isPageLoading: false}))
            );
        })
    )
}

const userSuccessEpics = combineEpics(revokeUserSuccessEpic, refreshUserSuccessEpic, loginUserSuccessEpic, loginUserWithGoogleSuccessEpic);
export default userSuccessEpics;
