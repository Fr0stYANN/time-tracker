import React, { useState } from 'react';
import {  DisplaySentRequestType, generateStatusIcon, getApproveRecordsContent } from 'utils/vacationsDisplayData';
import { Button, Modal, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useActions, useAppSelector } from 'hooks';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UpdateVacationFormType, UpdateVacationType, VacationType } from 'types/vacationTypes';
import { selectUser } from 'store/selectors/userSelectors';
import RequestVacationModal from '../RequestVacationForm/RequestVacationModal';
import { selectLoading } from 'store/selectors/loadingSelectors';

export type PropsType = {
   userId: number
   requests: DisplaySentRequestType [] | null
}

const dateFormat = 'YYYY-MM-DD';

const SentRequest = (props: PropsType): JSX.Element => {

    const { info, confirm } = Modal;

    const [requestModalVisibility, setRequestModalVisibility] = useState<boolean>(false);
    const [requestedVacation, setRequestedVacation] = useState<VacationType | undefined>(undefined);

    const { getRequestedVacationApiRequest, updateVacationApiRequest, deleteVacationApiRequest } = useActions();

    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectLoading);

    const handleApproveInfoClick = (record: DisplaySentRequestType) => {
        let content: string[] = getApproveRecordsContent(record);
        info({
            title: 'Information',
            content: <div dangerouslySetInnerHTML={{__html:`${content.join('<br/>')}`}}/>,
            centered: true,
            onOk() {
            },
        });
    }

    const setModalVisibility = (visibility: boolean) => {
        setRequestModalVisibility(visibility);
    }

    const handleEditClick = (record: DisplaySentRequestType) => {
        let vacation: VacationType = record.vacation;
        setModalVisibility(true);
        setRequestedVacation(vacation as VacationType);
    }

    const handleDeleteClick = (record: DisplaySentRequestType) => {
        confirm({
            title: 'Confirm delete',
            content: `Are you sure you want to delete vacation request from
                      ${record.vacation.startDate} to ${record.vacation.endDate}?`,
            centered: true,
            okButtonProps: {color: 'red'},
            onOk() {
                deleteVacationApiRequest(record.vacationId!);
                getRequestedVacationApiRequest(user?.id!);    
            },
            onCancel() {
            }
        })
    }

    const onSubmit = (values: UpdateVacationFormType): void => {
        let updateVacation: UpdateVacationType = {
            id: values.id,
            userId: values.userId,
            startDate: values.rangeDate && values.rangeDate[0]?.format(dateFormat),
            endDate: values.rangeDate && values.rangeDate[1]?.format(dateFormat),
            comment: values.comment
        };
        updateVacationApiRequest(updateVacation as UpdateVacationType);
        getRequestedVacationApiRequest(user?.id!);
        setModalVisibility(false);
    }

    const getStatusIcon = (record: DisplaySentRequestType) => {
        const status: string = generateStatusIcon(record)!;
        let responseIcon = null;
        switch (status) {
            case "approved":
                responseIcon = <CheckCircleOutlined style={{color: 'green'}}/>
                break;
            case "declined":
                responseIcon = <CloseCircleOutlined style={{color: 'red'}}/>
                break;
            case "pending":
                responseIcon = <ClockCircleOutlined style={{color: 'purple'}}/>
                break;
            default: 
                break;
        }
        return responseIcon;
    }

    return (
        <div>
            <RequestVacationModal
                requestedVacation={requestedVacation}
                isVisible={requestModalVisibility}
                userId={user?.id!}
                setModalVisibility={setModalVisibility}
                buttonText="edit"
                onSubmit={onSubmit}
            />
            <Table
                dataSource={props.requests!}
                loading={loading.isSentVacationRequestsLoading}
                pagination={false}
            >
                <Column
                    title="Start Date"
                    dataIndex="startDate"
                    key="startDate"
                />
                <Column
                    title="End Date"
                    dataIndex="endDate"
                    key="endDate"
                />
                <Column
                    title="Comment"
                    dataIndex="comment"
                    key="comment"
                />
                <Column
                    title="Feedback"
                    dataIndex="approveString"
                    key="approveString"
                    render={(value: string, record: DisplaySentRequestType) =>
                        <>
                            <Button onClick={() => handleApproveInfoClick(record)}>{value}</Button>
                        </>
                    }
                />
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="vacationId"
                    render={(value: number, record: DisplaySentRequestType) => 
                        <>
                        {
                            !record.vacation.isApproved
                            &&
                            !record.approveRecords?.some((approve) => approve.isApproved != null) ?
                            <Space
                                size={'middle'}
                            >   
                                    <Button
                                        icon={<EditOutlined />}
                                        size={"small"}
                                        onClick={() => handleEditClick(record)}
                                    />
                                    <Button
                                    icon={<DeleteOutlined/>}
                                    size={"small"}
                                    onClick={() => handleDeleteClick(record)}
                                    />
                            </Space>
                            : <div>No actions</div>
                        }
                        </>
                    }
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="vacationId"
                    render={(value: number, record: DisplaySentRequestType) => 
                        <>
                            {
                                getStatusIcon(record)
                            }
                        </>
                    }
                />
            </Table>
        </div>
    );
};

export default SentRequest;