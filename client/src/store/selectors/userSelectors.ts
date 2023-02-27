import { RootState } from '../index';

export const selectUser = (state: RootState) => state.user;
export const selectUserOptions = (state: RootState) => state.user?.options;
export const selectUsers = (state: RootState) => state.users.users;
export const selectVacationApprovers = (state: RootState) => state.vacations.vacationApprovers;
export const selectUserById = (id: string) => {
    return (state: RootState) => state.users.users.find((user) => user.id == Number(id));
}
export const selectTotalUsersLength = (state: RootState) => state.users.records;
export const selectEditUser = (state: RootState) => state.users.editUser!;
export const selectUserWorkType = (state: RootState) => state.user?.workType.name;
