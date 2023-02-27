import moment from "moment";
import {combineEpics, ofType} from "redux-observable";
import {mergeMap, of} from "rxjs";

import {
    addSpecialDay, addSpecialRangeOfDay,
    ApiActionEnum,
    CalendarActionEnum,
    fetchDataCalendarApiRequest,
    setDataOfDate
} from "store/slices/calendarDataSlice";

import {CalendarDataType, DayType} from "types/calendarTypes";

import {DayTypeActionEnum, setAllType} from "store/slices/dayTypeSlice";
import { setLoading } from "store/slices/loadingSlice";

const addRangeDaySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CalendarActionEnum.insertRangeDay}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const calendarData = action.payload.data.calendar.insertRange;

            calendarData.forEach((dayInfo: CalendarDataType) => {
                dayInfo.date = moment(dayInfo.date);
            });

            return of(addSpecialRangeOfDay(calendarData as CalendarDataType));
        })
    );
};

const addSingleDaySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CalendarActionEnum.insertSingleDay}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const calendarData = action.payload.data.calendar.insertSingle;
            calendarData.date = moment(calendarData.date);

            return of(addSpecialDay(calendarData as CalendarDataType));
        })
    );
};

const getDataCalendarSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CalendarActionEnum.fetchDataCalendar}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const calendarData = action.payload.data.calendar.getAll;
            calendarData?.forEach((dayInfo: CalendarDataType) => {
                dayInfo.date = moment(dayInfo.date);
            });

            return of(
                setDataOfDate(calendarData as CalendarDataType),
                setLoading({isCalendarPageLoading: false})
            );
        })
    );
};

const deleteDaySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CalendarActionEnum.deleteDay}${ApiActionEnum.apiSuccess}`),
        mergeMap(() => {
            return of(fetchDataCalendarApiRequest());
        })
    );
};

const editDaySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CalendarActionEnum.editDay}${ApiActionEnum.apiSuccess}`),
        mergeMap(() => {
            return of(fetchDataCalendarApiRequest());
        })
    );
};

const fetchDayTypeSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${DayTypeActionEnum.fetchAllDayType}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            const dayTypeData = action.payload.data.dayType.getAll;
            return of(setAllType(dayTypeData as DayType));
        })
    );
};

const calendarSuccessEpics = combineEpics(
    addRangeDaySuccessEpic,
    addSingleDaySuccessEpic,
    getDataCalendarSuccessEpic,
    deleteDaySuccessEpic,
    editDaySuccessEpic,
    fetchDayTypeSuccessEpic
);

export default calendarSuccessEpics;
