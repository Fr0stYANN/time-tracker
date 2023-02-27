import { Button, DatePicker, Form, Input, Modal, Typography } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';
import React, { useEffect } from 'react';
import { VacationType } from 'types/vacationTypes';
 
export type PropsType = {
    isVisible: boolean
    userId: number
    setModalVisibility: Function
    requestedVacation?: VacationType
    vacationDays?: number
    onSubmit: (vacation: any) => void
    buttonText: string
}

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const RequestVacationModal = (props: PropsType) => {
    const [form] = Form.useForm();
    const {
        requestedVacation,
        onSubmit,
        buttonText,
        setModalVisibility,
        userId,
        isVisible
    } = props;

    useEffect(() => {
        if (requestedVacation)
            form.setFieldsValue({
                id: requestedVacation.id,
                userId: requestedVacation.user.id,
                rangeDate: [
                    requestedVacation?.startDate === undefined ? 
                    undefined : moment(`${requestedVacation?.startDate}`, dateFormat),
                    requestedVacation?.endDate === undefined ?
                    undefined : moment(`${requestedVacation?.endDate}`, dateFormat)
                ],
                comment: requestedVacation.comment
        })
    }, [requestedVacation])

    return(
        <Modal
            visible={isVisible}
            onCancel={() => {
                setModalVisibility(false)
                form.resetFields()
            }}
            footer={null}
            destroyOnClose={true}

        >
            <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    onFinish={onSubmit}
                >
                    <Typography.Title title='h5' style={{display: 'flex', justifyContent: 'flex-start', fontSize: '25px'}}>Request vacation</Typography.Title>
                    <div style={{color: 'red'}}>{ props?.vacationDays! <= 0 ? 
                    <p>Note that you have no available vacation days</p> : null }</div>
                    <Form.Item
                        name="id"
                        initialValue={requestedVacation?.id}
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="userId"
                        initialValue={userId}
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='rangeDate'
                        label='choose date range of vacation'
                        style={{marginLeft: '0px'}}
                        initialValue={[requestedVacation?.startDate === undefined ? 
                                       undefined : moment(`${requestedVacation?.startDate}`, dateFormat),
                                       requestedVacation?.endDate === undefined ?
                                       undefined : moment(`${requestedVacation?.endDate}`, dateFormat)]}
                        rules={[{ required: true, message: 'Please select date' }]}>
                       <RangePicker
                        size='middle'
                        locale={locale}
                        />
                    </Form.Item>
                    <Form.Item
                     name='comment'
                     label='comment (optional)'
                     initialValue={requestedVacation?.comment}
                     style={{marginLeft: '0px'}}>
                       <Input
                        size='middle'
                        placeholder='comment'
                        style={{ marginTop: 5 }}
                    />
                    </Form.Item>
                    <Form.Item
                        name='submitButton'>
                        <Button 
                            type="primary"
                            htmlType="submit"
                            style={{ marginTop: 2, right: '0px', bottom: '-20px', position: 'absolute' }}
                        >
                            {buttonText}
                        </Button>
                    </Form.Item>
                </Form>
        </Modal>
    );
};

export default RequestVacationModal;