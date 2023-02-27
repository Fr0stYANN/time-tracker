import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetWorkTimeUserType, WorkTimeType} from "../../types/workTimeType";

const initialState: WorkTimeType | null = {
    workedMinutes: 0,
    totalWorkHours: 0
};

const workTimeSlice = createSlice({
    name: "workTimeSlice",
    initialState,
    reducers: {
        setUserWorkTime: (state, action: PayloadAction<WorkTimeType>) => {
            return action.payload;
        }
    }
});

export const {setUserWorkTime} = workTimeSlice.actions;

export const getWorkTimeUserApiRequest = createAction<GetWorkTimeUserType>("workTime/getWorkTimeUser/api/request");
export const getWorkTimeUserApiSuccess = createAction("workTime/getWorkTimeUser/api/success");

export const enum WorkTimeActionEnum {
    getWorkTimeUser = 'workTime/getWorkTimeUser'
}

export default workTimeSlice;
