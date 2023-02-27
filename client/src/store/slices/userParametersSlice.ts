import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetUsersParametersType } from 'types/userTypes';

type InitialStateType = GetUsersParametersType;
const initialState: InitialStateType = {
    pagination: {
        page: 1,
        pageSize: 5
    },
    filters: null,
    sort: null,
    search: null
}

const userParametersSlice = createSlice({
    name: 'userParameters',
    initialState,
    reducers: {
        setParameters: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const {
    setParameters
} = userParametersSlice.actions;

export default userParametersSlice;
