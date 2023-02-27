import {Col, DatePicker, DatePickerProps, Row, Spin, Switch, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import {User} from "../types/userTypes";
import {useParams} from "react-router-dom";
import {apiRequest, ApiRequestParams} from "../api/common/apiRequest";
import {getUserByIdQuery} from "../api/queries/usersQueries";
import {useActions, useAppSelector} from "../hooks";
import {selectWorkDays} from "../store/selectors/workDaysSelectors";
import {getWorkDaysInHours} from "../utils/getWorkDaysInHours";
import WorkChart from "../components/WorkChart/WorkChart";
import {selectLoading} from "../store/selectors/loadingSelectors";
import UserNameContainer from "../components/Stuff/UserNameContainer";
import {DisplayHoursWorkDayType, WorkDayType} from "../types/workTimeType";

const WorkChartPage = (): JSX.Element => {
    const [monthWorkDays, setMonthWorkDays] = useState<Moment>(moment());
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isWeekendShows, setWeekendShows] = useState<boolean>(false);

    const { getUserWorkDaysApiRequest } = useActions();

    const userId = Number(useParams().id);

    useEffect(() => {
        const getUserApiRequest = async() => {
            const response = await apiRequest({...getUserByIdQuery(userId)} as ApiRequestParams);
            setUser(response.data.user.getById);
        }

        getUserApiRequest();
    }, []);

    useEffect(() => {
        const startOfMonth = moment(monthWorkDays).startOf('month');
        const endOfMonth = moment(monthWorkDays).endOf('month');
        
        getUserWorkDaysApiRequest({
            userId: userId,
            startDate: startOfMonth.format("YYYY-MM-DD"),
            endDate: endOfMonth.format("YYYY-MM-DD"),
            isWeekendShows: isWeekendShows
        });

    }, [monthWorkDays, isWeekendShows]);

    const onChange: DatePickerProps['onChange'] = (date) => {
        setMonthWorkDays(date!);
    }

    const isLoading = useAppSelector(selectLoading).isWorkChartLoading;
    const workDays: WorkDayType[] = useAppSelector(selectWorkDays);
    const displayData: DisplayHoursWorkDayType[] = getWorkDaysInHours(workDays);

    return (
        <>
            <Row justify={'end'}>

            </Row>
            <Row>
                <Col>
                    <UserNameContainer
                        firstname={user?.firstname}
                        lastname={user?.lastname}
                        email={user?.email}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 30}} justify={'end'} align={'middle'} gutter={20}>
                <Col>
                    <Tooltip title={'Show weekend'}>
                        <Switch
                            defaultChecked={isWeekendShows}
                            onChange={(checked: boolean) => setWeekendShows(checked)}
                        />
                    </Tooltip>
                </Col>
                <Col>
                    <DatePicker onChange={onChange} picker="month" defaultValue={monthWorkDays}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Spin size="default" spinning={isLoading}>
                        <WorkChart data={displayData} />
                    </Spin>
                </Col>
            </Row>
        </>
    )
}

export default WorkChartPage;