import moment, {Moment} from "moment";
import {useEffect, useState} from "react";
import {useActions, useAppSelector} from "hooks";
import {TimeTracksList} from "components";
import {Button, DatePicker, DatePickerProps, Divider, Row} from "antd";
import {selectUser} from "store/selectors/userSelectors";
import TimeTrackModal from "components/TimeTracksModal/TimeTrackModal";
import {dateMomentComparator} from "utils/dateComparator";
import PartTimeTracker from "components/PartTimeTracker/PartTimeTracker";
import {
    createTimeTrackMutation,
    deleteTimeTrackMutation,
    updateTimeTrackMutation
} from "api/mutations/timeTracksMutation";
import TimeProgress from "../components/TimeProgress/TimeProgress";
import {selectWorkTimeUser} from "../store/selectors/workTimeSelector";

const PersonalTimeTracksPage = (): JSX.Element => {
    const {getTimeTracksByUserIdAndRangeDatesApiRequest, getWorkTimeUserApiRequest} = useActions();
    const timeTracks = useAppSelector(state => state.timetracks);
    const timeTracksSorted = [...timeTracks].sort(dateMomentComparator("desc"));
    const workTime = useAppSelector(selectWorkTimeUser);
    const user = useAppSelector(selectUser)!;
    const isUserPartTimer = user.workType.name === "part-time";
    const [monthTimeTracks, setMonthTimeTracks] = useState<Moment>(moment());
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const startOfMonth = moment(monthTimeTracks).startOf('month');
        const endOfMonth = moment(monthTimeTracks).endOf('month');

        getTimeTracksByUserIdAndRangeDatesApiRequest({
            "startDate": startOfMonth.format("YYYY-MM-DDTHH:mm:ss"),
            "endDate": endOfMonth.format("YYYY-MM-DDTHH:mm:ss"),
            "userId": user.id
        });

    }, [monthTimeTracks]);

    useEffect(() => {
        const startDate = moment.utc().startOf('month');
        const endDate = moment.utc();

        getWorkTimeUserApiRequest({
            userId: user.id,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD")
        });
    }, [timeTracks])

    const monthPickerHandle: DatePickerProps['onChange'] = (date) => {
        setMonthTimeTracks(date!);
    };

    return (
        <>
            <TimeProgress workTime={workTime}/>
            {isUserPartTimer &&
				<>
                    {<PartTimeTracker/>}
					<Divider/>
				</>
            }
            <Row justify="space-between" style={{marginBottom: 25}}>
                <DatePicker onChange={monthPickerHandle} picker="month" defaultValue={monthTimeTracks}/>
                {isUserPartTimer &&
	                <Button type="primary" onClick={() => setCreateModalVisible(true)}>Add time track</Button>
                }
            </Row>
            <TimeTracksList
                timeTracks={timeTracksSorted}
                showActions={isUserPartTimer}
                isPersonalTimeTracks={true}
                mutations={{
                    updateMutation: {
                        api: updateTimeTrackMutation,
                        name: "update"
                    },
                    deleteMutation: {
                        api: deleteTimeTrackMutation,
                        name: "delete"
                    }
                }}
            />
            <TimeTrackModal
                type="create"
                title="Create time track"
                payload={{userId: user.id}}
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
                okText="Create"
                mutation={{
                    api: createTimeTrackMutation,
                    name: "create"
                }}
                isVisibleTimeTrackType={false}
            />
        </>
    );
}

export default PersonalTimeTracksPage;
