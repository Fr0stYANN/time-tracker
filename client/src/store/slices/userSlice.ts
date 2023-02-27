import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/userTypes';

type InitialStateType = User | null;
const initialState = null as InitialStateType;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => action.payload,
        removeUser: (state) => null
    }
});

export const {
    setUser,
    removeUser
} = userSlice.actions;

export default userSlice;
