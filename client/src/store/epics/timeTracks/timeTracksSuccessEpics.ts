import {mergeMap, of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';

import {ApiActionEnum, TimetracksActionEnum} from "enums/actionEnums";

import {TimeTrack} from "types/timeTracksTypes";
import {setTimeTracks} from "store/slices/timeTracksSlice";

const getTimeTracksByUserIdAndRangeDatesSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TimetracksActionEnum.getByUserIdAndRangeDate}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(setTimeTracks(action.payload.data.timeTrack.getByUserIdAndDateRange as TimeTrack[]));
        })
    );
};

const timeTracksSuccessEpics = combineEpics(getTimeTracksByUserIdAndRangeDatesSuccessEpic);
export default timeTracksSuccessEpics;
