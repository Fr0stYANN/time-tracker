import { ApproveVacationType, UpdateVacationType, VacationType } from './../../types/vacationTypes';
import { RequestVacationType } from 'types/vacationTypes';
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from 'types/userTypes';

type InitialStateType = {
    vacationsToApprove: VacationType[]
    requestedVacation: VacationType[]
    vacationApprovers: User[]
}

const initialState: InitialStateType = {
    vacationsToApprove: [],
    requestedVacation: [],
    vacationApprovers: [],
};

const vacationSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        setRequestedVacations: (state, action: PayloadAction<VacationType[]>) => {
            state.requestedVacation = action.payload;
        },
        addRequestedVacation: (state, action: PayloadAction<VacationType>) => {
            state.requestedVacation.push(action.payload);
        },
        setVacationsToApprove: (state, action: PayloadAction<VacationType[]>) => {
            state.vacationsToApprove = action.payload;
        },
        clearVacationState: (state) => {
            state.requestedVacation = [];
            state.vacationsToApprove = [];
            state.vacationApprovers = [];
        },
        setVacationApprovers: (state, action: PayloadAction<User[]>) => {
            state.vacationApprovers = action.payload;
        },
        updateVacation: (state, action: PayloadAction<VacationType>) => {
            let index = state.requestedVacation.findIndex(request => request.id === action.payload.id);
            state.requestedVacation[index] = action.payload;
        }
    }
});

export const createVacationApiRequest = createAction<RequestVacationType>('vacation/create/api/request');
export const getRequestedVacationApiRequest = createAction<number>('vacation/getRequestedVacation/api/request');
export const getVacationsToApproveApiRequest = createAction<number>('vacation/getVacationsToApprove/api/request');
export const approveVacationApiRequest = createAction<ApproveVacationType>('vacation/approveVacation/api/request');
export const declineVacationApiRequest = createAction<ApproveVacationType>('vacation/declineVacation/api/request');
export const getVacationApproversApiRequest = createAction<number>('vacation/getVacationApprovers/api/request');
export const updateVacationApiRequest = createAction<UpdateVacationType>('vacation/update/api/request');
export const deleteVacationApiRequest = createAction<number>('vacation/delete/api/request');

export const {
    setRequestedVacations,
    setVacationsToApprove,
    addRequestedVacation,
    clearVacationState,
    setVacationApprovers,
    updateVacation,
} = vacationSlice.actions;

export default vacationSlice;
