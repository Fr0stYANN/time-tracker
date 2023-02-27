import { RootState } from '../index';

export const selectLoading = (state: RootState) => state.isLoading;