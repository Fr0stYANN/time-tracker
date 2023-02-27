import {Calendar} from 'antd'
import type {Moment} from 'moment';
import {CalendarDataType} from "types/calendarTypes";
import statusOfDay from "./statusOfDay";
import searchDateInState from "../../helperFunctions/searchDateInState";
import "./calendarItem.css";

type PropertyType = {
    selectedDay: Moment;
    setSelectedDay: Function;
}

const CalendarItem = ({selectedDay, setSelectedDay}: PropertyType) => {

    const onChangeSelectedDay = (e: Moment) => {
        setSelectedDay(e);
    };

    const dateCellRender = (value: Moment) => {
        const statusDay: CalendarDataType = searchDateInState(value)!;
        if (statusDay) {
            return statusOfDay(statusDay.dayType, statusDay.hoursToWork);
        }
    };

    return (
        <div>
            <Calendar
                className="calendar"
                value={selectedDay}
                onChange={(day) => onChangeSelectedDay(day)}
                dateCellRender={dateCellRender}
            />
        </div>
    )
}

export default CalendarItem;
