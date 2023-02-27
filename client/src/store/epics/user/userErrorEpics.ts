import {combineEpics, ofType} from 'redux-observable';
import {ApiActionEnum, UserActionEnum} from '../../../enums/actionEnums';
import {concat, mergeMap, of} from 'rxjs';
import {setLoading} from '../../slices/loadingSlice';
import {removeUser} from '../../slices/userSlice';
import {setNotification} from "../../slices/notificationsSlice";
import {removeAuthTokens} from "../../../helperFunctions/removeAuthTokens";

const loginUserErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.loginUser}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            return of(setNotification({
                        message: 'An error occurred',
                        description: action.payload,
                        type: 'error'
                    }
                ),
                setLoading({isPageLoading: false}),
                removeUser());
        })
    )
}

const loginUserWithGoogleErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.loginGoogle}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {

            return of(setNotification({
                        message: 'An error occurred',
                        description: action.payload,
                        type: 'error'
                    }
            ),
            setLoading({isPageLoading: false}),
            removeUser());
        })
    )
}

const refreshUserErrorEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${UserActionEnum.refreshUser}${ApiActionEnum.apiError}`),
        mergeMap((action: any) => {
            removeAuthTokens();

            return concat(
                of(setNotification({
                        message: 'An error occurred',
                        description: action.payload,
                        type: 'error'
                    }
                )),
                of(removeUser()),
                of(setLoading({isPageLoading: false, isAuthLoaded: true}))
            );
        })
    )
}

const userErrorEpics = combineEpics(loginUserErrorEpic, refreshUserErrorEpic, loginUserWithGoogleErrorEpic);
export default userErrorEpics;
