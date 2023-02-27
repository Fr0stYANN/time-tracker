import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SickLeaveType } from '../../types/sickLeaveTypes';

type InitialStateType = SickLeaveType[]

const initialState: InitialStateType = []

const sickLeavesSlice = createSlice({
    name: 'sickLeaves',
    initialState,
    reducers: {
        pushSickLeaves: (state, action: PayloadAction<SickLeaveType[]>) => action.payload,

        addSickLeave: (state, action: PayloadAction<SickLeaveType>) => {
            state.push(action.payload)
        },

        editSickLeave: (state, action: PayloadAction<SickLeaveType>) => {
            const index = state.findIndex((sickLeave: SickLeaveType) =>
                sickLeave.id === action.payload.id);
            state[index] = action.payload;
        },

        deleteSickLeave: (state, action: PayloadAction<number>) => {
            return state.filter((sickLeave) => sickLeave.id !== action.payload);
        }
    }
})

export const {
    pushSickLeaves,
    addSickLeave,
    editSickLeave,
    deleteSickLeave
} = sickLeavesSlice.actions

export default sickLeavesSlice;