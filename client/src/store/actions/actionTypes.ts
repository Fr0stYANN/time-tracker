import { ApiActionEnum } from '../../enums/actionEnums';

export type ApiRequestActionType = {
    type: `${string}/${ApiActionEnum.apiRequest}`,
    payload: any
}
