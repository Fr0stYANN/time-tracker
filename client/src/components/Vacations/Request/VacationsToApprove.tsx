import React, { useState } from 'react';
import { Button, Table, Space } from 'antd';
import Column from 'antd/lib/table/Column';
import { useActions } from 'hooks';
import { DisplayVacationToApproveType } from 'utils/vacationsDisplayData';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ResponseToRequestModal from '../ResponseToRequestModal/ResponseToRequestModal';

export type PropsType = {
  userId: number
  vacationsToApprove: DisplayVacationToApproveType[] | null
}

const VacationsToApprove = (props: PropsType): JSX.Element => {

    const { approveVacationApiRequest, declineVacationApiRequest } = useActions();
    const [currentVacationToApprove, setCurrentVacationToApprove] =  useState<DisplayVacationToApproveType | undefined>(undefined);
    const [comment, setComment] = useState<string | undefined>(undefined);
    const [responseModalVisibility, setResponseModalVisibility] = useState<boolean>(false);
    const [type, setType] = useState<string | undefined>(undefined);

    const handleApproveVacationClick = (record: DisplayVacationToApproveType) => {
      setCurrentVacationToApprove(record);
      setResponseModalVisibility(true);
      setType("approve");
    }

    const handleDeclineVacationClick = (record: DisplayVacationToApproveType) => {
      setCurrentVacationToApprove(record);
      setResponseModalVisibility(true);
      setType("decline");
    }

    const onClose = () => {
      setCurrentVacationToApprove(undefined);
      setComment(undefined);
      setResponseModalVisibility(false);
      setType(undefined);
    }

    const onSubmit = () => {
      if (type === "approve") {
        approveVacationApiRequest({
          vacationRecordId: currentVacationToApprove?.key!,
          comment: comment!
        })
      } else {
        declineVacationApiRequest({
          vacationRecordId: currentVacationToApprove?.key!,
          comment: comment!
        })
      }
      onClose();
    }


    
    return (
        <div>
            <ResponseToRequestModal
              setComment={setComment}
              currentVacation={currentVacationToApprove!}
              type={type!}
              onSubmit={onSubmit}
              isVisible={responseModalVisibility}
              onClose={onClose}
            />
            <Table 
              dataSource={props.vacationsToApprove!}
              pagination={false}
            >   
              <Column
                title="Firstname"
                dataIndex="firstName"
                key="firstname"
              />
              <Column
                title="Lastname"
                dataIndex="lastName"
                key="lastname"
              />
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
                title="Actions"
                render={(record: DisplayVacationToApproveType) => 
                  <>
                    <Space>
                      <Button 
                        icon={<CheckOutlined/>}
                        onClick={() => handleApproveVacationClick(record)}
                        />
                      <Button
                        icon={<CloseOutlined/>}
                        onClick={() => handleDeclineVacationClick(record)}
                      />
                    </Space>
                  </>
                }
              />
            </Table>
        </div>
    );
};

export default VacationsToApprove;