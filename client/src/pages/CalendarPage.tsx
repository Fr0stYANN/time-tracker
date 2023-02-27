import CalendarItem from "../components/Calendar/CalendarItem";
import DayControl from "../components/Calendar/DayControl"
import {Alert, Row, Spin} from "antd";
import {Option} from "../utils/option";
import {useActions, useAppSelector} from "../hooks";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import searchDateInState from "../helperFunctions/searchDateInState";
import {useSelector} from "react-redux";
import isHaveOption from "../store/selectors/isHaveOption";
import {selectLoading} from "../store/selectors/loadingSelectors";

const CalendarPage = () => {
    const isHaveCalendarManagement = useSelector(isHaveOption(Option.CalendarManagement));
    const currentDay = searchDateInState(moment());
    const loading = useAppSelector(selectLoading).isCalendarPageLoading;

    const {fetchDataCalendarApiRequest, fetchAllDayTypeApiRequest} = useActions();

    const [selectedDay, setSelectedDay] = useState<Moment>(moment());

    useEffect(() => {
        fetchDataCalendarApiRequest();
        fetchAllDayTypeApiRequest();
    }, [])

    return (
        <Spin spinning={loading} size="large">
            {currentDay &&
				<Row>
					<Alert
						message={<div>Today is: {currentDay.dayType.name}</div>}
						type="warning"
						banner
						style={{marginBottom: 20, width: "100%", border: "1px solid orange", borderRadius: "5px"}}/>
				</Row>}
            <Row>
                {isHaveCalendarManagement &&
					<DayControl
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
					/>
                }
            </Row>
            <CalendarItem selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
        </Spin>
    )
}

export default CalendarPage;
