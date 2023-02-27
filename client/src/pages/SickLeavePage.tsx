import SickLeaveList from '../components/SickLeaveList/SickLeaveList';
import {Button, Col, Modal, Row, Space} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useActions, useAppSelector} from "../hooks";
import SickLeaveModal from "../components/SickLeaveModal/SickLeaveModal";
import {AddSickLeaveType, UpdateSickLeaveType} from "../types/sickLeaveTypes";
import {selectSickLeaves} from "../store/selectors/sickLeaveSelectors";
import getDisplaySickLeavesData from "../utils/getDisplaySickLeavesData";
import {useParams} from "react-router-dom";
import {selectLoading} from "../store/selectors/loadingSelectors";
import {User} from "../types/userTypes";
import {getUserByIdQuery} from "../api/queries/usersQueries";
import {apiRequest, ApiRequestParams} from "../api/common/apiRequest";
import UserNameContainer from "../components/Stuff/UserNameContainer";

const SickLeavePage = (): JSX.Element => {
    const { confirm } = Modal;

    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [editModalPayload, setEditModalPayload] = useState<UpdateSickLeaveType | null>(null);
    const [user, setUser] = useState<User | undefined>(undefined);

    const { deleteSickLeaveApiRequest, editSickLeaveApiRequest, getSickLeavesByUserIdApiRequest,
        addSickLeaveApiRequest, pushSickLeaves } = useActions();

    const userId = Number(useParams().id);

    const getUserApiRequest = async() => {
        const response = await apiRequest({...getUserByIdQuery(userId)} as ApiRequestParams);
        setUser(response.data.user.getById);
    }

    useEffect(() => {
        getSickLeavesByUserIdApiRequest(userId);

        return function () {
            pushSickLeaves([]);
        }
    }, []);

    useEffect(() => {
        getUserApiRequest();
    }, []);

    const onAddClick = () => setAddModalVisible(true);

    const onEditClick = (record: any) => {
        setEditModalVisible(true);
        setEditModalPayload({
            id: Number(record.key),
            startDate: record.startDate,
            endDate: record.endDate
        } as UpdateSickLeaveType)
    }

    const onDeleteClick = (id: string) => {
        confirm({
            title: 'Warning',
            content: 'Are you sure you want to delete this sick leave record?',
            centered: true,
            onOk() {
                deleteSickLeaveApiRequest(Number(id));
            },
            onCancel() {},
        });
    }


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
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: any) => {
                return (
                    <Space>
                        <Button
                            icon={<EditOutlined/>}
                            size={"small"}
                            onClick={() => onEditClick(record)}
                        />
                        <Button
                            icon={<DeleteOutlined/>}
                            size={"small"}
                            onClick={() => onDeleteClick(record.key)}
                        />
                    </Space>
                );
            }
        }
    ];

    const isLoading = useAppSelector(selectLoading);
    const sickLeaves = useAppSelector(selectSickLeaves);
    const displayData = getDisplaySickLeavesData(sickLeaves);

    const handleAddSickLeaveClick = (startDate: string, endDate: string) => {
        addSickLeaveApiRequest({
            userId: userId,
            startDate: startDate,
            endDate: endDate
        } as AddSickLeaveType);
        setAddModalVisible(false);
    }

    const handleEditSickLeaveClick = (startDate: string, endDate: string, id: number) => {
        editSickLeaveApiRequest({
            id: id,
            startDate: startDate,
            endDate: endDate
        } as UpdateSickLeaveType);
    }

    return (
        <>
            <Row justify='space-between' style={{marginBottom: '15px'}}>
                <Col>
                    <UserNameContainer
                        firstname={user?.firstname}
                        lastname={user?.lastname}
                        email={user?.email}
                    />
                </Col>
                {user?.isActivated &&
                    <Col>
                        <Button
                            type={"primary"}
                            onClick={onAddClick}
                        >
                            Add sick leave
                        </Button>
                    </Col>
                }
            </Row>
            <Row>
                <Col span={24}>
                    <SickLeaveList
                        columns={columns}
                        data={displayData}
                        isLoading={isLoading.isSickLeavesLoading}
                    />
                </Col>
            </Row>
            <SickLeaveModal
                title={"Edit sick leave"}
                isVisible={isEditModalVisible}
                setVisible={setEditModalVisible}
                payload={editModalPayload}
                okText={"Edit"}
                handleOnOkClick={handleEditSickLeaveClick}
                onCancelCallback={() => setEditModalPayload(null)}
            />
            <SickLeaveModal
                title={"Add sick leave"}
                isVisible={isAddModalVisible}
                setVisible={setAddModalVisible}
                payload={undefined}
                okText={"Add"}
                handleOnOkClick={handleAddSickLeaveClick}
                onCancelCallback={undefined}
            />
        </>
    );
}

export default SickLeavePage;
