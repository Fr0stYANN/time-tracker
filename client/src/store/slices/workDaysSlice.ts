import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WorkDayType} from "../../types/workTimeType";

type InitialStateType = WorkDayType[];

const initialState: InitialStateType = [];

const workDaysSlice = createSlice({
    name: 'workDays',
    initialState,
    reducers: {
        pushWorkDays: (state, action: PayloadAction<WorkDayType[]>) => action.payload
    }
});

export const {
    pushWorkDays
} = workDaysSlice.actions;

export default workDaysSlice;