import {Button, DatePicker, Form, FormInstance, Input, Select, Spin, Typography} from 'antd';
import EmailFormItem from './EmailFormItem';
import moment from 'moment';
import {User} from 'types/userTypes';
import OptionType from 'types/optionType';
import React, { useEffect, useState } from 'react';

export type FormProps = {
    user?: User,
    options?: OptionType[],
    vacationApprovers?: User[],
    users?: User[],
    setUserParameters?: Function
    header: string
    buttonText: string
    onSubmit: (user: any) => void
    form: FormInstance<any>
    onSearch?: (value: string) => void
    spinning?: boolean
}


const UserForm = (props: FormProps): JSX.Element => {
    const [approvers, setApprovers] = useState<React.ReactElement[]>();

    const {
        users
    } = props;

    useEffect(() => {
        getApprovers(users!);
    }, [users])

    const getApprovers = (users: User[]): void => {
        let selectOptions: React.ReactElement[] = [];

        users?.map((user) => {
           if (user.id !== props.user?.id!) {
                let option;

                option =
                <Select.Option
                    key={user.id}
                    value={user?.email}
                >
                    {user.email} ({user.firstname} {user.lastname})
                </Select.Option>

                selectOptions.push(option);
            }
        })

        setApprovers(selectOptions);
    }

    return (
        <>
           <Spin
                spinning={props.spinning!}
                size="large"
            >
            <Typography.Title title="h3">{props.header}</Typography.Title>
                <Form form={props.form} layout="vertical" autoComplete="off" onFinish={props.onSubmit}>
                    <Form.Item
                        name="id"
                        initialValue={props.user?.id!}
                        hidden={true}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Firstname"
                        name="firstname"
                        initialValue={props.user?.firstname!}
                        rules={[{
                            required: true, type: 'string',
                            validateTrigger: 'onBlur', message: 'firstname is not valid'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Lastname"
                        name="lastname"
                        initialValue={props.user?.lastname!}
                        rules={[{
                            required: true, type: 'string',
                            validateTrigger: 'onBlur', message: 'lastname is not valid'
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <EmailFormItem value={props.user?.email!}/>

                    <Form.Item
                        label="Work type"
                        name="workTypeId"
                        initialValue={props.user?.workType!.id!.toString()}
                        rules={[{
                            required: true, type: 'string',
                            validateTrigger: 'onBlur', message: 'work type is not valid'
                        }]}
                    >
                        <Select>
                            <Select.Option value='1'>Full time</Select.Option>
                            <Select.Option value='2'>Part time</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Employment Date"
                        name="employmentDate"
                        initialValue={props.user?.employmentDate === undefined ? undefined : moment(`${props.user.employmentDate}`, 'YYYY-MM-DD')}
                        rules={[{
                            required: true, type: 'date',
                        validateTrigger: 'onBlur', message: 'employment date is not valid'
                        }]}
                    >
                        <DatePicker/>
                    </Form.Item>

                    <Form.Item
                        label="Options"
                        name="options"
                        initialValue={props.user?.options?.map(opt => opt.id)!}
                    >
                        <Select
                            mode="multiple"
                        >
                        {
                            props.options &&
                            props.options.map((option) => {
                                return (
                                    <Select.Option
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </Select.Option>
                                )
                            })
                        }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Approvers"
                        name="vacationApprovers"
                        initialValue={props.vacationApprovers?.
                            map(approver => {
                                if (approver.id !== props.user?.id) {
                                    return `${approver.email} (${approver.firstname} ${approver.lastname})`!
                                }
                            })
                        }
                        >
                        <Select
                            mode="multiple"
                            placeholder="select vacation approvers"
                            onSearch={props.onSearch}
                        >
                            {
                                approvers
                            }
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginTop: 10}}>{props.buttonText}</Button>
                </Form>
            </Spin>
        </>
    );
}

export default UserForm;

