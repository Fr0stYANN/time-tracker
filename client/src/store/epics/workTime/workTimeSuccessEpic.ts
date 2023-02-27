import {concat, filter, mergeMap, of} from "rxjs";
import {
    getWorkTimeUserApiSuccess,
    setUserWorkTime
} from "../../slices/workTimeSlice";
import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, UserWorkDaysActionEnum} from "../../../enums/actionEnums";
import {pushWorkDays} from "../../slices/workDaysSlice";
import {setLoading} from "../../slices/loadingSlice";
import {WorkDayType} from "../../../types/workTimeType";

const getWorkTimeUserSuccessEpic = (action$: any) => {
    return action$.pipe(
        filter(getWorkTimeUserApiSuccess.match),
        mergeMap((action: any) => {
            return of(setUserWorkTime(action.payload.data.workTime.getWorkTimeUserByRangeOfDate));
        })
    );
};

const getWorkDaysByUserIdAndDateRangeSuccessEpic =(action$: any) => {
    return action$.pipe(
        ofType(`${UserWorkDaysActionEnum.getByUserIdAndDateRange}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return concat(
                of(pushWorkDays(action.payload.data.workTime.getDailyWorkTimeUserByRangeOfDate as WorkDayType[])),
                of(setLoading({isWorkChartLoading: false}))
            );
        })
    )
}

const workTimeSuccessEpic = combineEpics(getWorkTimeUserSuccessEpic, getWorkDaysByUserIdAndDateRangeSuccessEpic);
export default workTimeSuccessEpic;