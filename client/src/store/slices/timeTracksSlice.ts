import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {TimeTrack} from "types/timeTracksTypes";

const initialState: TimeTrack[] = [];

const timeTracksSlice = createSlice({
    name: 'timetracks',
    initialState,
    reducers: {
        setTimeTracks: (state, action: PayloadAction<TimeTrack[]>) => {
            return action.payload
        },
        addTimeTrack: (state, action: PayloadAction<TimeTrack>) => {
            state.push(action.payload)
        },
        deleteTimeTrack: (state, action: PayloadAction<number>) => {
            return state.filter((timeTrack) => timeTrack.id !== action.payload);
        },
        updateTimeTrack: (state, action: PayloadAction<TimeTrack>) => {
            return state.map((timeTrack) => {
                if (timeTrack.id === action.payload.id) {
                    return action.payload;
                }

                return timeTrack;
            });
        }
    }
});

export const {
    setTimeTracks,
    addTimeTrack,
    deleteTimeTrack,
    updateTimeTrack
} = timeTracksSlice.actions;

export default timeTracksSlice;
