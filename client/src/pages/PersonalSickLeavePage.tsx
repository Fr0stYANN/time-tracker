import SickLeaveList from '../components/SickLeaveList/SickLeaveList';
import {useEffect} from 'react';
import {useActions, useAppSelector} from '../hooks';
import {selectUser} from '../store/selectors/userSelectors';
import {User} from '../types/userTypes';
import {SickLeaveType} from '../types/sickLeaveTypes';
import {selectSickLeaves} from '../store/selectors/sickLeaveSelectors';
import getDisplaySickLeavesData, {DisplaySickLeavesData} from "../utils/getDisplaySickLeavesData";
import {selectLoading} from "../store/selectors/loadingSelectors";
import {Col, Row} from "antd";

const columns = [
    {
        title: "From (date)",
        dataIndex: "startDate",
        key: "startDate",
    },
    {
        title: "To (date)",
        dataIndex: "endDate",
        key: "endDate"
    }
];

const PersonalSickLeavePage = (): JSX.Element => {
    const { getSickLeavesByUserIdApiRequest, pushSickLeaves } = useActions();

    const user: User = useAppSelector(selectUser)!;
    const isLoading = useAppSelector(selectLoading);
    const personalSickLeaves: SickLeaveType[] = useAppSelector(selectSickLeaves);
    const displaySickLeavesData: DisplaySickLeavesData[] | undefined = getDisplaySickLeavesData(personalSickLeaves);

    useEffect(() => {
        getSickLeavesByUserIdApiRequest(user.id);

        return function () {
            pushSickLeaves([]);
        }
    }, []);

    return (
        <Row>
            <Col span={24}>
                <SickLeaveList
                    columns={columns}
                    data={displaySickLeavesData}
                    isLoading={isLoading.isSickLeavesLoading} />
            </Col>
        </Row>
    );
}

export default PersonalSickLeavePage;