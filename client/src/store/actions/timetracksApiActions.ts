import { createAction} from '@reduxjs/toolkit';
import {GetTimeTracksByUserIdAndDateRangePayload} from "types/timeTracksTypes";

export const getTimeTracksByUserIdAndRangeDatesApiRequest = createAction<GetTimeTracksByUserIdAndDateRangePayload>('timetracks/getByUserIdAndRangeDates/api/request');
