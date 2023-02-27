import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    isPageLoading: boolean
    isUsersLoading: boolean
    isAuthLoaded: boolean
    isSickLeavesLoading: boolean
    isEditUserLoading: boolean
    isSentVacationRequestsLoading: boolean
    isCalendarPageLoading: boolean
    isWorkChartLoading: boolean
}

const initialState: InitialStateType = {
    isPageLoading: false,
    isUsersLoading: false,
    isSickLeavesLoading: false,
    isEditUserLoading: false,
    isSentVacationRequestsLoading: false,
    isCalendarPageLoading: false,
    isAuthLoaded: false,
    isWorkChartLoading: false
};

const loadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<any>) => ({...state, ...action.payload})
    }
});

export const {
  setLoading
} = loadingSlice.actions;

export default loadingSlice;
