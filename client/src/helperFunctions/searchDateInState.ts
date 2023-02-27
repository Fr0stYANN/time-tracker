import {Moment} from "moment";
import {useAppSelector} from "hooks";
import {selectCalendarData} from "store/selectors/calendarSelector";

const formatDate = "YYYY-MM-DD";

const SearchDateInState = (value: Moment | undefined) => {
    const daysInfo = useAppSelector(selectCalendarData);

    return daysInfo.find((date) => {
        return date.date.format(formatDate) === value?.format(formatDate);
    });
};

export default SearchDateInState;
