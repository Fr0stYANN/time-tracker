import { Input, Modal } from 'antd';
import React from 'react';
import { DisplayVacationToApproveType } from 'utils/vacationsDisplayData';

export type PropsType = {
    currentVacation: DisplayVacationToApproveType
    setComment: React.Dispatch<React.SetStateAction<string | undefined>>
    isVisible: boolean
    onClose: () => void
    onSubmit: () => void
    type: string
}

const ResponseToRequestModal = (props: PropsType) => {
    return (
        <>
            <Modal
                title={`Confirm ${props.type}`}
                visible={props.isVisible}
                onCancel={() => props.onClose()}
                destroyOnClose={true}
                onOk={() => props.onSubmit()}
            >
                {
                props.currentVacation &&
                <div> 
                  Are you sure you want to
                  {
                    props.type === "decline" ? " decline " : " approve "
                  } 
                  vacation request for {props.currentVacation.firstName} {props.currentVacation.lastName} 
                  <br/>
                  from {props.currentVacation.startDate} to {props.currentVacation.endDate}?
                </div>
                }
                <Input
                    style={{marginTop: '10px'}}
                    name="comment"
                    placeholder="comment (if needed)"
                    onChange={(e) => props.setComment(e.currentTarget.value)}
                />
            </Modal>
        </>
    );
};

export default ResponseToRequestModal;