import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationTypes, SetNotificationType } from '../../types/notificationTypes';
import { buildNotification } from "../../utils/buildNotification";

type InitialStateType = NotificationTypes[];

const initialState: InitialStateType = [];

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<SetNotificationType>) =>
            [...state, buildNotification(action.payload)],

        removeNotification: (state, action: PayloadAction<string>) =>
            state.filter(notify => notify.id !== action.payload),
    }
})

export const {
    setNotification,
    removeNotification
} = notificationsSlice.actions;

export default notificationsSlice;
