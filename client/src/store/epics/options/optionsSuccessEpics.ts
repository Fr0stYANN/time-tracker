import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, of } from 'rxjs';
import { ApiActionEnum, OptionActionEnum } from 'enums/actionEnums';
import { pushOptions } from 'store/slices/optionsSlice';
import OptionType from "types/optionType";
import { setLoading } from '../../slices/loadingSlice';

const getOptionsSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${OptionActionEnum.getOptions}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(
                pushOptions(action.payload.data.option.getAll as OptionType[])
            );
        })
    )
}

const optionsSuccessEpics = combineEpics(getOptionsSuccessEpic);
export default optionsSuccessEpics;
