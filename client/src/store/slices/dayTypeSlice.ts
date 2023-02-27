import {DayType} from "types/calendarTypes";
import {createAction, createSlice} from "@reduxjs/toolkit";

const initialState : DayType[] = [];

const dayTypeSlice = createSlice({
    name: "dayTypeSlice",
    initialState,
    reducers:{
        setAllType: (state , action) => {
            return action.payload;
        },
    }
})

export const { setAllType } = dayTypeSlice.actions;

export const fetchAllDayTypeApiRequest = createAction("calendar/fetchAllDayType/api/request");

export const enum DayTypeActionEnum {
    fetchAllDayType = "calendar/fetchAllDayType"
}

export default dayTypeSlice;
