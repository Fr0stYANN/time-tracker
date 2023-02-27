import { RootState } from '../index';

export const selectRequestedVacations = (state: RootState) => state.vacations.requestedVacation;
export const selectVacationsToApprove = (state: RootState) => state.vacations.vacationsToApprove;