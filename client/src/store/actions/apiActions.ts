import { createAction } from '@reduxjs/toolkit';
import type { ApiRequestParamsType, ApiSuccessType } from 'types/apiTypes';
import { ApiActionEnum } from 'enums/actionEnums';

export const ApiRequestAction = createAction<ApiRequestParamsType>('api/request');

export const apiErrorAction = ({ error, feature }: any) => {
    return {
        type: `${feature}${ApiActionEnum.apiError}`,
        payload: error,
    }
}

export const apiSuccessAction = ({ json, feature }: ApiSuccessType) => {
    return {
        type: `${feature}${ApiActionEnum.apiSuccess}`,
        payload: json
    }
}
