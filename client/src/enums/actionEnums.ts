export const enum UserActionEnum {
    loginUser = 'user/login',
    refreshUser = 'user/refresh',
    revokeUser = 'user/revoke',
    loginGoogle = 'user/googleLogin'
}

export const enum VacationActionEnum {
    createVacation = 'vacation/create',
    getRequestedVacation = 'vacation/getRequestedVacation',
    getVacationsToApprove = 'vacation/getVacationsToApprove',
    approveVacation = 'vacation/approveVacation',
    getVacationApprovers = 'vacation/getVacationApprovers',
    update = 'vacation/update',
    delete = 'vacation/delete',
    decline = 'vacation/declineVacation'
}

export const enum UsersActionEnum {
    getUsers = 'users/get',
    addUser = 'users/add',
    getUserById = 'users/getById',
    updateUser = 'users/update',
    setActivationStatusUser = 'users/setActivationStatus'
}

export const enum ApiActionEnum {
    apiRequest = '/api/request',
    apiSuccess = '/api/success',
    apiError = '/api/error'
}

export const enum OptionActionEnum {
    getOptions = 'options/get'
}

export const enum TimetracksActionEnum {
    getByUserIdAndRangeDate = 'timetracks/getByUserIdAndRangeDate'
}

export const enum SickLeavesActionEnum {
    getByUserId = 'sickleave/get',
    addSickLeave = 'sickleave/add',
    editSickLeave = 'sickleave/edit',
    deleteSickLeave = 'sickleave/delete'
}

export const enum UserWorkDaysActionEnum {
    getByUserIdAndDateRange = 'workdays/get'
}
