import {DayType} from "types/calendarTypes";
import "./statusOfDay.css";

const statusOfDay = (type: DayType, hoursToWork: number) =>{
    switch (type.name){

        case "Day Off": return(
            <div className="status dayOff">Day off</div>
        );

        case "Holiday": return(
            <div className="status holiday">Holiday</div>
        );

        case "Short Day": return(
            <div className="status shortDay">{hoursToWork}h</div>
        );

        default: return (<></>)
    }
}

export default statusOfDay;
