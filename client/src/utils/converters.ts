import {AddUserFormType, AddUserType, UpdateUserFormType, UpdateUserType} from "../types/userTypes";

export const convertAddUserFormType = (user: AddUserFormType): AddUserType => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        vacationApprovers: user.vacationApprovers,
        employmentDate: user.employmentDate.format('YYYY-MM-DD'),
        workTypeId: Number(user.workTypeId),
        options: user.options
    }
}

export const convertEditUserFormType = (user: UpdateUserFormType): UpdateUserType => {
    let regex: RegExp =  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let vacationApprovers: string[] = [];
    user.vacationApprovers.map(approver => {
        if (approver.match(regex)) {
            vacationApprovers.push(approver);
        }
    });

    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        vacationApprovers: vacationApprovers,
        email: user.email,
        employmentDate: user.employmentDate.format('YYYY-MM-DD'),
        workTypeId: Number(user.workTypeId),
        options: user.options
    }
}
