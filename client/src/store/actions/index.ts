import calendarDataSlice, {
    fetchDataCalendarApiRequest,
    addSingleDayApiRequest,
    addRangeDayApiRequest,
    deleteDayApiRequest,
    editDayApiRequest
} from "../slices/calendarDataSlice";
import vacationSlice, {
  approveVacationApiRequest,
  createVacationApiRequest,
  deleteVacationApiRequest,
  getRequestedVacationApiRequest,
  getVacationApproversApiRequest,
  getVacationsToApproveApiRequest,
  updateVacationApiRequest,
  declineVacationApiRequest
 } from "store/slices/vacationSlice";
import {
    loginUserApiRequest,
    refreshUserApiRequest,
    revokeUserApiRequest,
    addUserApiRequest,
    getUsersApiRequest,
    setActivationStatusUserApiRequest,
    updateUserApiRequest,
    getUserByIdApiRequest,
    loginUserWithGoogleApiRequest
} from './userApiActions';
import {
    addSickLeaveApiRequest,
    deleteSickLeaveApiRequest,
    editSickLeaveApiRequest,
    getSickLeavesByUserIdApiRequest
} from "./sickLeaveApiActions";
import {getOptionsApiRequest} from "./optionsApiActions";
import {getTimeTracksByUserIdAndRangeDatesApiRequest} from "./timetracksApiActions";

import userSlice from "../slices/userSlice";
import loadingSlice from "../slices/loadingSlice";
import dayTypeSlice, {fetchAllDayTypeApiRequest} from "../slices/dayTypeSlice";
import usersSlice from "../slices/usersSlice";
import optionsSlice from "../slices/optionsSlice";
import userParametersSlice from "../slices/userParametersSlice";
import notificationsSlice from "../slices/notificationsSlice";
import timeTracksSlice from "../slices/timeTracksSlice";
import excelFilesSlice, {getUserListFileApiRequest} from "../slices/userListFilesSlice";
import workTimeSlice, {getWorkTimeUserApiRequest} from "../slices/workTimeSlice";
import sickLeavesSlice from "../slices/sickLeavesSlice";
import {getUserWorkDaysApiRequest} from "./workDaysApiActions";
import workDaysSlice from "../slices/workDaysSlice";


export default {
    ...userSlice.actions,
    ...loadingSlice.actions,
    ...calendarDataSlice.actions,
    ...dayTypeSlice.actions,
    ...usersSlice.actions,
    ...optionsSlice.actions,
    ...userParametersSlice.actions,
    ...notificationsSlice.actions,
    ...timeTracksSlice.actions,
    ...excelFilesSlice.actions,
    ...workTimeSlice.actions,
    ...vacationSlice.actions,
    ...sickLeavesSlice.actions,
    ...workDaysSlice.actions,
    loginUserApiRequest,
    loginUserWithGoogleApiRequest,
    refreshUserApiRequest,
    revokeUserApiRequest,
    fetchDataCalendarApiRequest,
    addSingleDayApiRequest,
    addRangeDayApiRequest,
    deleteDayApiRequest,
    editDayApiRequest,
    fetchAllDayTypeApiRequest,
    addUserApiRequest,
    getUsersApiRequest,
    setActivationStatusUserApiRequest,
    updateUserApiRequest,
    getUserByIdApiRequest,
    getOptionsApiRequest,
    getTimeTracksByUserIdAndRangeDatesApiRequest,
    getUserListFileApiRequest,
    getWorkTimeUserApiRequest,
    createVacationApiRequest,
    getRequestedVacationApiRequest,
    getVacationsToApproveApiRequest,
    approveVacationApiRequest,
    getVacationApproversApiRequest,
    updateVacationApiRequest,
    deleteVacationApiRequest,
    declineVacationApiRequest,
    getSickLeavesByUserIdApiRequest,
    addSickLeaveApiRequest,
    editSickLeaveApiRequest,
    deleteSickLeaveApiRequest,
    getUserWorkDaysApiRequest
}
