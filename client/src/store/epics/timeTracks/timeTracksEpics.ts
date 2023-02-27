import {filter, mergeMap, of} from 'rxjs';
import {combineEpics} from 'redux-observable';

import {ApiRequestAction} from 'store/actions/apiActions';
import {getTimeTracksByUserIdAndRangeDatesApiRequest} from "store/actions/timetracksApiActions";
import {ApiRequestParamsType} from 'types/apiTypes';

import {getTimeTracksByUserIdAndDateRangeQuery} from "api/queries/timeTracksQueries";
import {TimetracksActionEnum} from "enums/actionEnums";

const getTimeTracksByUserIdAndRangeDatesEpic = (action$: any) => {
    return action$.pipe(
        filter(getTimeTracksByUserIdAndRangeDatesApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getTimeTracksByUserIdAndDateRangeQuery(action.payload, TimetracksActionEnum.getByUserIdAndRangeDate)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    )
}

const timeTracksEpics = combineEpics(getTimeTracksByUserIdAndRangeDatesEpic);
export default timeTracksEpics;
