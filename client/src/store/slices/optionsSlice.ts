import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import OptionType from '../../types/optionType';

type InitialStateType = OptionType[];
const initialState: InitialStateType = [];

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        pushOptions: (state, action: PayloadAction<OptionType[]>) => {
            return action.payload;
        }
    }
});

export const {
    pushOptions
} = optionsSlice.actions;

export default optionsSlice;
