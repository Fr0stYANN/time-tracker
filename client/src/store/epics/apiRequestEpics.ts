import {apiRequest} from 'api/common/apiRequest';
import {filter, mergeMap, catchError, from, map, of} from 'rxjs';
import {apiErrorAction, ApiRequestAction, apiSuccessAction} from 'store/actions/apiActions';
import {combineEpics} from 'redux-observable';
import {ApiRequestActionType} from '../actions/actionTypes';

const apiRequestEpic = (action$: any) => {
    return action$.pipe(
        filter(ApiRequestAction.match),
        mergeMap((action: ApiRequestActionType) => {
            const {body, url, feature} = action.payload;

            return from(apiRequest({url: url, body: body})).pipe(
                map(json => apiSuccessAction({json, feature})),
                catchError(error => of(apiErrorAction({error, feature}))))
        })
    )
}

const apiEpics = combineEpics(apiRequestEpic);
export default apiEpics;
