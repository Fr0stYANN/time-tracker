import moment, {Moment} from "moment";
import React, {useEffect, useState} from "react";
import {useActions, useAppSelector} from "hooks";
import {TimeTracksList} from "components";
import {Button, Col, DatePicker, DatePickerProps, Row} from "antd";
import TimeTrackModal from "components/TimeTracksModal/TimeTrackModal";
import {dateMomentComparator} from "utils/dateComparator";
import {useParams} from "react-router-dom";
import {
    createForUserTimeTrackMutation,
    updateForUserTimeTrackMutation,
    deleteForUserTimeTrackMutation
} from "api/mutations/timeTracksMutation";
import {apiRequest, ApiRequestParams} from "../api/common/apiRequest";
import {getUserByIdQuery} from "../api/queries/usersQueries";
import {User} from "../types/userTypes";
import UserNameContainer from "../components/Stuff/UserNameContainer";

const TimeTracksPage = (): JSX.Element => {
    const params = useParams();
    const userId = parseInt(params.id!);

    const {getTimeTracksByUserIdAndRangeDatesApiRequest} = useActions();
    const timeTracks = [...useAppSelector(state => state.timetracks)].sort(dateMomentComparator("desc"));

    const [monthTimeTracks, setMonthTimeTracks] = useState<Moment>(moment());
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);

    const getUserApiRequest = async () => {
        const response = await apiRequest({...getUserByIdQuery(userId)} as ApiRequestParams);
        setUser(response.data.user.getById);
    }

    useEffect(() => {
        const startOfMonth = moment(monthTimeTracks).utc().startOf('month');
        const endOfMonth = moment(monthTimeTracks).utc().endOf('month');

        getTimeTracksByUserIdAndRangeDatesApiRequest({
            "startDate": startOfMonth.format("YYYY-MM-DDTHH:mm:ss"),
            "endDate": endOfMonth.format("YYYY-MM-DDTHH:mm:ss"),
            "userId": userId
        });

    }, [monthTimeTracks]);

    useEffect(() => {
        getUserApiRequest();
    }, []);

    const monthPickerHandle: DatePickerProps['onChange'] = (date) => {
        setMonthTimeTracks(date!);
    }

    return (
        <>
            <Row style={{marginBottom: 20}} justify={'start'}>
                <Col>
                    <UserNameContainer
                        firstname={user?.firstname}
                        lastname={user?.lastname}
                        email={user?.email}
                    />
                </Col>
            </Row>
            <Row style={{marginBottom: 25}} justify={'space-between'}>
                <DatePicker onChange={monthPickerHandle} picker="month" defaultValue={monthTimeTracks}/>
                {user?.isActivated &&
	                <Button style={{marginLeft: 15}} type="primary" onClick={() => setCreateModalVisible(true)}>Add time track</Button>
                }
            </Row>
            <TimeTracksList
                timeTracks={timeTracks}
                mutations={{
                    updateMutation: {
                        api: updateForUserTimeTrackMutation,
                        name: "updateForUser"
                    },
                    deleteMutation: {
                        api: deleteForUserTimeTrackMutation,
                        name: "deleteForUser"
                    }
                }}
                showActions={user?.isActivated}
            />
            <TimeTrackModal
                type="create"
                title="Create time track"
                payload={{userId: userId}}
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
                okText="Create"
                mutation={{
                    api: createForUserTimeTrackMutation,
                    name: "createForUser"
                }}
                isVisibleTimeTrackType={true}
            />
        </>
    );
}

export default TimeTracksPage;
