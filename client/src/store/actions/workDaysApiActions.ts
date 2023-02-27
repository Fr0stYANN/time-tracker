import {createAction} from "@reduxjs/toolkit";
import {GetWorkDaysByUserIdAndDateRangeType} from "../../types/workTimeType";

export const getUserWorkDaysApiRequest = createAction<GetWorkDaysByUserIdAndDateRangeType>('workdays/get/api/request');