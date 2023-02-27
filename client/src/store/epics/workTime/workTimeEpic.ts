import {concat, filter, mergeMap, of} from "rxjs";
import {apiRequestAction} from "../../slices/calendarDataSlice";
import {ApiRequestParamsType} from "types/apiTypes";
import {getWorkTimeUserApiRequest, WorkTimeActionEnum} from "../../slices/workTimeSlice";
import {getUserWorkDaysQuery, getWorkTimeUserQuery} from "api/queries/workTimeQueries";
import {combineEpics} from "redux-observable";
import {getUserWorkDaysApiRequest} from "../../actions/workDaysApiActions";
import {UserWorkDaysActionEnum} from "../../../enums/actionEnums";
import {ApiRequestAction} from "../../actions/apiActions";
import {setLoading} from "../../slices/loadingSlice";

const getWorkTimeUserEpic = (action$: any) => {
    return action$.pipe(
        filter(getWorkTimeUserApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getWorkTimeUserQuery(action.payload, WorkTimeActionEnum.getWorkTimeUser)
            };

            return of(apiRequestAction(apiRequestParams as ApiRequestParamsType));
        })
    );
};

const getWorkDaysByUserIdAndDateRangeEpic =(action$: any) => {
    return action$.pipe(
        filter(getUserWorkDaysApiRequest.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getUserWorkDaysQuery(action.payload, UserWorkDaysActionEnum.getByUserIdAndDateRange)
            }

            return concat(
                of(ApiRequestAction(apiRequestParams as ApiRequestParamsType)),
                of(setLoading({isWorkChartLoading: true}))
            )
        })
    );
}

const workTimeEpic = combineEpics(getWorkTimeUserEpic, getWorkDaysByUserIdAndDateRangeEpic);

export default workTimeEpic;
