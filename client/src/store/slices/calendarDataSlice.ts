import moment from "moment";
import {createAction, createSlice} from "@reduxjs/toolkit";
import {ApiRequestParamsType} from "types/apiTypes";
import {
    CalendarDataType,
    CalendarSingleInputType,
    CalendarRangeInputType,
    CalendarInputType
} from "types/calendarTypes";

const initialState: CalendarDataType[] = [
    {
        id: 0,
        date: moment(),
        dayType: {id: 0, name: ""},
        hoursToWork: 0
    }
];

const calendarDataSlice = createSlice({
    name: "calendarDataSlice",
    initialState,
    reducers: {
        setDataOfDate: (state, action) => action.payload,
        addSpecialDay: (state, action) => {
            state.push(action.payload);
        },
        addSpecialRangeOfDay: (state, action) => {
            var days = action.payload;
            days.forEach((date: CalendarDataType) => {
                state.push(date);
            });
        }
    }
});

export const {setDataOfDate, addSpecialDay, addSpecialRangeOfDay} = calendarDataSlice.actions;

export const fetchDataCalendarApiRequest = createAction("calendar/fetchDataCalendar/api/request")
export const addSingleDayApiRequest = createAction<CalendarSingleInputType>("calendar/insertSingleDay/api/request")
export const addRangeDayApiRequest = createAction<CalendarRangeInputType>("calendar/insertRangeDay/api/request")
export const deleteDayApiRequest = createAction<string>("calendar/deleteDay/api/request");
export const editDayApiRequest = createAction<CalendarInputType>("calendar/editDay/api/request");
export const apiRequestAction = createAction<ApiRequestParamsType>('api/request');

export const enum CalendarActionEnum {
    fetchDataCalendar = 'calendar/fetchDataCalendar',
    insertSingleDay = 'calendar/insertSingleDay',
    insertRangeDay = 'calendar/insertRangeDay',
    deleteDay = 'calendar/deleteDay',
    editDay = 'calendar/editDay'
}

export const enum ApiActionEnum {
    apiRequest = '/api/request',
    apiSuccess = '/api/success'
}

export default calendarDataSlice;
