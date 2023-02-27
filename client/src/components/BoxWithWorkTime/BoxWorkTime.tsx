import {Col} from "antd";
import {WorkTimeType} from "types/workTimeType";
import {getFormatTimeFromMinutes} from "../../utils/getFormatTimeFromMinutes";

export const BoxWorkTime = (workTime: WorkTimeType) => {
    const formatWorkedTime = getFormatTimeFromMinutes(workTime.workedMinutes);

    return (
        <>
            <Col style={{fontSize: 21}}>
                <div>
                    <span style={{color: 'grey'}}>Worked time:</span> {`${formatWorkedTime.hours} h. ${formatWorkedTime.minutes} m.`}
                </div>
                <div>
                    <span style={{color: 'grey'}}>
                        Total time to work until today:
                    </span> {workTime.totalWorkHours} h.
                </div>
            </Col>
        </>
    )
}
