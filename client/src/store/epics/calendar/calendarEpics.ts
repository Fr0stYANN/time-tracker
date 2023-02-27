import {filter, mergeMap, of} from "rxjs";
import {combineEpics, ofType} from "redux-observable";

import {DayTypeActionEnum, fetchAllDayTypeApiRequest} from "store/slices/dayTypeSlice";
import {
    addRangeDayApiRequest,
    addSingleDayApiRequest,
    apiRequestAction,
    CalendarActionEnum,
    deleteDayApiRequest,
    editDayApiRequest,
    fetchDataCalendarApiRequest
} from "store/slices/calendarDataSlice";

import {fetchDataCalendarQuery, fetchDayTypeQuery} from "api/queries/calendarQueries";
import {ApiRequestParamsType} from "types/apiTypes";

import {
    addRangeDayMutation,
    addSingleDayMutation,
    deleteDayMutation,
    editDayMutation
} from "api/mutations/calendarMutation";
import { setLoading } from "store/slices/loadingSlice";


const getDataCalendarEpic = (action$: any) => {
    return action$.pipe(
        filter(fetchDataCalendarApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...fetchDataCalendarQuery(action.payload,
                    CalendarActionEnum.fetchDataCalendar)
            };

            return of(
                apiRequestAction(apiRequestParams as ApiRequestParamsType),
                setLoading({isCalendarPageLoading: true})
            );
        })
    );
};

const addSingleDayEpic = (action$: any) => {
    return action$.pipe(
        ofType(addSingleDayApiRequest),
        mergeMap((action: any) => {
                const apiRequestParams = {...addSingleDayMutation(action.payload, CalendarActionEnum.insertSingleDay)};
                return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
            }
        )
    );
};

const addRangeDayEpic = (action$: any) => {
    return action$.pipe(
        ofType(addRangeDayApiRequest),
        mergeMap((action: any) => {
                const apiRequestParams = {...addRangeDayMutation(action.payload, CalendarActionEnum.insertRangeDay)};
                return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
            }
        )
    );
};

const deleteDayEpic = (action$: any) => {
    return action$.pipe(
        ofType(deleteDayApiRequest),
        mergeMap((action: any) => {
            const apiRequestParams = {...deleteDayMutation(action.payload, CalendarActionEnum.deleteDay)};
            return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
};

const editDayEpic = (action$: any) => {
    return action$.pipe(
        ofType(editDayApiRequest),
        mergeMap((action: any) => {
            const apiRequestParams = {...editDayMutation(action.payload, CalendarActionEnum.editDay)};

            return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
};

const fetchDayTypeEpic = (action$: any) => {
    return action$.pipe(
        ofType(fetchAllDayTypeApiRequest),
        mergeMap((action: any) => {
            const apiRequestParams = {...fetchDayTypeQuery(DayTypeActionEnum.fetchAllDayType)};

            return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
};

const calendarEpics = combineEpics(
    getDataCalendarEpic,
    addSingleDayEpic,
    addRangeDayEpic,
    deleteDayEpic,
    editDayEpic,
    fetchDayTypeEpic
);

export default calendarEpics;
