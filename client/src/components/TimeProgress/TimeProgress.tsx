import React, {useEffect, useState} from 'react';
import {Card, Progress, Row, Spin} from "antd";
import {BoxWorkTime} from "../BoxWithWorkTime/BoxWorkTime";
import {getMinutesFromHours} from "../../helperFunctions/getMinutesFromHours";
import {useAppSelector} from "../../hooks";
import {selectWorkTimeUser} from "../../store/selectors/workTimeSelector";
import {WorkTimeType} from "../../types/workTimeType";

type Props = {
    workTime?: WorkTimeType
}

const TimeProgress = ({workTime}: Props): JSX.Element => {
    const percent = Math.trunc((workTime!.workedMinutes / getMinutesFromHours(workTime!.totalWorkHours)) * 100);
    const percentFormat = isNaN(percent) ? 0 : percent;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (workTime) {
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        }
    }, [workTime])

    return (
        <Spin spinning={isLoading}>
            <Card style={{marginBottom: 25}}>
                <Row justify="space-around" align="middle">
                    <BoxWorkTime
                        workedMinutes={workTime!.workedMinutes}
                        totalWorkHours={workTime!.totalWorkHours}
                    />
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#91d0ff',
                            '100%': '#108ee9',
                        }}
                        percent={percentFormat}
                        format={() => percentFormat + '%'}
                        width={150}
                        strokeWidth={10}
                    />
                </Row>
            </Card>
        </Spin>
    );
};

export default TimeProgress;
