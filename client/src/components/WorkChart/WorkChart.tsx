import React from "react";
import {Column} from "@ant-design/charts";
import {DisplayHoursWorkDayType} from "../../types/workTimeType";

type Props = {
    data: DisplayHoursWorkDayType[]
}

const WorkChart = ({data}: Props): JSX.Element => {

    return (
        <Column
            data={data}
            xField={'date'}
            yField={'workedHours'}
            padding={'auto'}
            seriesField={'name'}
        />
    );
}

export default WorkChart;