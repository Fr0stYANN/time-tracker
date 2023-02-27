import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import calendarEpics from "./epics/calendar/calendarEpics";
import calendarSuccessEpics from "./epics/calendar/calendarSuccessEpics";

import apiEpics from './epics/apiRequestEpics';
import userEpics from './epics/user/userEpics';
import userSuccessEpics from './epics/user/userSuccessEpics';

import { vacationEpics } from './epics/vacations/vacationEpics';
import { vacationSuccessEpics } from './epics/vacations/vacationSuccessEpics';
import vacationErrorEpics from './epics/vacations/vacationErrorEpics';

import usersEpics from './epics/users/usersEpics';
import usersSuccessEpics from './epics/users/usersSuccessEpics';
import userErrorEpics from './epics/user/userErrorEpics';
import usersErrorEpics from './epics/users/usersErrorEpics';
import optionsEpics from './epics/options/optionsEpics';
import optionsSuccessEpics from './epics/options/optionsSuccessEpics';
import timeTracksEpics from "./epics/timeTracks/timeTracksEpics";
import timeTracksSuccessEpics from "./epics/timeTracks/timeTracksSuccessEpics";
import workTimeEpic from "./epics/workTime/workTimeEpic";
import workTimeSuccessEpic from "./epics/workTime/workTimeSuccessEpic";
import userListFileEpic from "./epics/usersListFile/usersListFileEpic"
import userListFileSuccessEpic from "./epics/usersListFile/usersListFileSuccessEpic"
import sickLeaveEpics from "./epics/sickLeave/sickLeaveEpics";
import sickLeaveSuccessEpics from "./epics/sickLeave/sickLeaveSuccessEpics";
import sickLeaveErrorEpics from "./epics/sickLeave/sickLeaveErrorEpics";

import userSlice from './slices/userSlice';
import loadingSlice from './slices/loadingSlice';
import calendarDataSlice from './slices/calendarDataSlice';
import dayTypeSlice from "./slices/dayTypeSlice";
import optionsSlice from './slices/optionsSlice';
import usersSlice from './slices/usersSlice';
import notificationsSlice from './slices/notificationsSlice';
import userParametersSlice from './slices/userParametersSlice';
import vacationSlice from './slices/vacationSlice';
import excelFilesSlice from "./slices/userListFilesSlice";
import workTimeSlice from "./slices/workTimeSlice";
import timeTracksSlice from './slices/timeTracksSlice';
import sickLeavesSlice from './slices/sickLeavesSlice';
import workDaysSlice from "./slices/workDaysSlice";

const rootEpic = combineEpics(
    apiEpics,
    userSuccessEpics,
    userEpics,
    usersEpics,
    usersSuccessEpics,
    userErrorEpics,
    usersErrorEpics,
    optionsEpics,
    optionsSuccessEpics,
    calendarEpics,
    calendarSuccessEpics,
    vacationEpics,
    vacationSuccessEpics,
    vacationErrorEpics,
    timeTracksEpics,
    timeTracksSuccessEpics,
    userListFileEpic,
    userListFileSuccessEpic,
    workTimeEpic,
    workTimeSuccessEpic,
    sickLeaveEpics,
    sickLeaveSuccessEpics,
    sickLeaveErrorEpics
);


const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
    user: userSlice.reducer,
    isLoading: loadingSlice.reducer,
    calendar: calendarDataSlice.reducer,
    dayType: dayTypeSlice.reducer,
    users: usersSlice.reducer,
    options: optionsSlice.reducer,
    userParameters: userParametersSlice.reducer,
    notifications: notificationsSlice.reducer,
    vacations: vacationSlice.reducer,
    timetracks: timeTracksSlice.reducer,
    excel: excelFilesSlice.reducer,
    workTime: workTimeSlice.reducer,
    sickLeaves: sickLeavesSlice.reducer,
    workDays: workDaysSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        epicMiddleware
    ]
});


epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
