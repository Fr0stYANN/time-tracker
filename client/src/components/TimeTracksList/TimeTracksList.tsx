import React, {useState} from 'react';
import moment from "moment";

import {Button, Dropdown, Space, Table} from 'antd';
import {CreationTypeTimeTrack, TimeTrack} from "types/timeTracksTypes";

import {DeleteOutlined, EditOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import TimeTrackModal from "../TimeTracksModal/TimeTrackModal";

type Props = {
    timeTracks: TimeTrack[],
    showActions?: boolean
    mutations: {
        updateMutation: { api: any, name: string }
        deleteMutation: { api: any, name: string }
    },
    isPersonalTimeTracks?: boolean
}

type OverlayEditProps = {
    record: TimeTrack
}

interface UpdateTimeTrackPayload {
    id: number
    startDate: string
    endDate: string
    timeTrackTypeId: number
}

interface DeleteTimeTrackPayload {
    id: number
    startDate: string
    endDate: string
    timeTrackTypeId: number
}

const TimeTracksList = ({timeTracks, showActions = false, mutations, isPersonalTimeTracks = false}: Props): JSX.Element => {
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

    const [editModalPayload, setEditModalPayload] = useState<UpdateTimeTrackPayload | null>(null);
    const [deleteModalPayload, setDeleteModalPayload] = useState<DeleteTimeTrackPayload | null>(null);

    const onEditClick = (record: TimeTrack) => {
        setEditModalVisible(true);
        setEditModalPayload({
            id: record.id,
            startDate: record.startDate,
            endDate: record.endDate,
            timeTrackTypeId: record.timeTrackType.id
        });
    };

    const onDeleteClick = (record: TimeTrack) => {
        setDeleteModalVisible(true);
        setDeleteModalPayload({
            id: record.id,
            startDate: record.startDate,
            endDate: record.endDate,
            timeTrackTypeId: record.timeTrackType.id
        });
    };

    const DropDownOverlay = ({record}: OverlayEditProps): JSX.Element => {
        const user = record.timeTrackUpdateHistory?.user;
        const date = moment.utc(record.timeTrackUpdateHistory?.date).local().format("HH:mm:ss YYYY.MM.DD");

        const timeTrackType = record.timeTrackType?.name;

        return (
            <div
                style={{backgroundColor: "white", padding: "10px 15px", boxShadow: "0px 0px 13px 0px rgba(0,0,0,0.2)"}}>
                {(timeTrackType === "Vacation" || timeTrackType === "Sick leave") &&
                    <p>{timeTrackType}</p>
                }
                {record.timeTrackUpdateHistory &&
		            <p>Edited by {user.firstname} {user.lastname} at {date}</p>
                }
            </div>
        );
    }

    const isTimeTrackClosed = (stringStartDate: string): boolean => {
        const date = new Date(stringStartDate);
        return date.getMonth() < new Date().getMonth();
    }

    return (
        <>
            <Table
                dataSource={timeTracks}
                pagination={false}
                rowKey="id"
            >
                <Table.Column
                    title="Start date"
                    dataIndex="startDate"
                    key="startDate"
                    render={(value: string) => moment.utc(value).local().format("DD.MM.YYYY HH:mm:ss")}
                />
                <Table.Column
                    title="End date"
                    dataIndex="endDate"
                    key="endDate"
                    render={(value: string) => moment.utc(value).local().format("DD.MM.YYYY HH:mm:ss")}
                />
                <Table.Column
                    title="Total time"
                    dataIndex="totalTime"
                    key="totalTime"
                />
                <Table.Column
                    title="Type of creation"
                    dataIndex="creationType"
                    key="creationType"
                    render={(value: CreationTypeTimeTrack, record: TimeTrack) =>
                        <>
                            {value?.name}
                            {(record.timeTrackUpdateHistory || record.timeTrackType?.name !== "Work") &&
								<Dropdown overlay={<DropDownOverlay record={record}/>} arrow>
									<InfoCircleTwoTone style={{marginLeft: 10}}/>
								</Dropdown>
                            }
                        </>
                    }
                />
                {showActions &&
					<Table.Column
						title="Actions"
						dataIndex="actions"
						key="id"
						render={(value: number, record: TimeTrack) =>
                            <Space>
                                <Button
                                    disabled={isTimeTrackClosed(record.startDate)}
                                    icon={<EditOutlined/>}
                                    size={"small"}
                                    onClick={() => onEditClick(record)}/>
                                <Button
                                    disabled={isTimeTrackClosed(record.startDate)}
                                    icon={<DeleteOutlined/>}
                                    size={"small"}
                                    onClick={() => onDeleteClick(record)}/>
                            </Space>
                        }
					/>
                }
            </Table>

            <TimeTrackModal
                type="edit"
                title={"Edit time track"}
                payload={editModalPayload}
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                onCancelCallback={() => setEditModalPayload(null)}
                okText="Save"
                mutation={mutations.updateMutation}
                isVisibleTimeTrackType={!isPersonalTimeTracks}
            />

            <TimeTrackModal
                type="delete"
                title={"Delete time track"}
                payload={deleteModalPayload}
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                onCancelCallback={() => setDeleteModalPayload(null)}
                okText="Delete"
                mutation={mutations.deleteMutation}
                isVisibleTimeTrackType={!isPersonalTimeTracks}
            />
        </>
    );
}

export default TimeTracksList;
