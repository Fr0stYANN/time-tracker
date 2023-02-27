import { createAction } from '@reduxjs/toolkit';

import { ApiSuccessType } from 'types/apiTypes';

import {
    AddUserType,
    GetUsersParametersType,
    LoginUserInputType,
    LoginUserWithGoogleInputType,
    RevokeUserParamsType, SetActivationStatusType,
    UpdateUserType
} from 'types/userTypes';

export const loginUserApiRequest = createAction<LoginUserInputType>('user/login/api/request');
export const refreshUserApiRequest = createAction<string>('user/refresh/api/request');
export const loginUserWithGoogleApiRequest = createAction<LoginUserWithGoogleInputType>('user/googleLogin/api/request');
export const loginUserApiSuccess = createAction<ApiSuccessType>('user/login/api/success');
export const revokeUserApiRequest = createAction<RevokeUserParamsType>('user/revoke/api/request');
export const getUsersApiRequest = createAction<GetUsersParametersType>('users/get/api/request');
export const getUserByIdApiRequest = createAction<number>('users/getById/api/request');
export const addUserApiRequest = createAction<AddUserType>('users/add/api/request');
export const updateUserApiRequest = createAction<UpdateUserType>('users/update/api/request');
export const setActivationStatusUserApiRequest = createAction<SetActivationStatusType>('users/delete/api/request');
