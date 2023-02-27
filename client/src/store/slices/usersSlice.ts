import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/userTypes';

type InitialStateType = {
    users: User[]
    records: number
    editUser: User | null
};
const initialState: InitialStateType = {
    users: [],
    records: 0,
    editUser: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        pushUsers: (state, action: PayloadAction<InitialStateType>) => {
            return {
                ...state,
                ...action.payload
            }
        },

        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },

        removeUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },

        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            state.users[index] = action.payload;
        },

        changeActivationStatusUser: (state, action: PayloadAction<number>) => {
            const users = state.users;
            const index = users.findIndex((user) => user.id === action.payload);
            users[index] = {...users[index], isActivated: !users[index]?.isActivated};
        },

        setEditUser: (state, action: PayloadAction<User>) => {
            state.editUser = action.payload;
        },

        removeEditUser: (state) => {
            state.editUser = null;
        }
    }
});

export const {
    pushUsers,
    addUser,
    removeUser,
    updateUser,
    setEditUser,
    removeEditUser,
    changeActivationStatusUser
} = usersSlice.actions;

export default usersSlice;
