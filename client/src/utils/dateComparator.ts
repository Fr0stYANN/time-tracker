import moment from 'moment';
import { TimeTrack } from 'types/timeTracksTypes';

export const dateMomentComparator = (order: "asc" | "desc" = "asc") =>  {
    switch (order) {
        case "asc": {
            return (a: TimeTrack, b: TimeTrack): number => {
                return moment(a.startDate).diff(moment(b.startDate));
            }
        }
        case "desc": {
            return (a: TimeTrack, b: TimeTrack): number => {
                return moment(b.startDate).diff(moment(a.startDate));
            }
        }
        default: {
            throw new Error(`dateMomentComparator invalid order '${order}' of sorting`);
        }
    }


}
