import { filter, mergeMap, of } from 'rxjs';
import { OptionActionEnum } from '../../../enums/actionEnums';
import { ApiRequestAction } from '../../actions/apiActions';
import { ApiRequestParamsType } from 'types/apiTypes';
import { getOptionsApiRequest } from '../../actions/optionsApiActions';
import { getOptionsQuery } from 'api/queries/optionsQueries';
import { combineEpics } from 'redux-observable';
import { setLoading } from '../../slices/loadingSlice';

const getOptionsEpic = (action$: any) => {
    return action$.pipe(
        filter(getOptionsApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getOptionsQuery(OptionActionEnum.getOptions)
            };

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType),
            );
        })
    )
}

const optionsEpics = combineEpics(getOptionsEpic);
export default optionsEpics;
