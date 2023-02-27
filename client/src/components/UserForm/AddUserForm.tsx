import {useEffect, useState} from 'react';
import {Form} from 'antd';
import {useActions, useAppSelector} from 'hooks';
import {selectOptions} from 'store/selectors/optionsSelector';
import UserForm, {FormProps} from './UserForm';
import {AddUserFormType, GetUsersParametersType} from "types/userTypes";
import {convertAddUserFormType} from "utils/converters";
import {selectUsers} from 'store/selectors/userSelectors';

const AddUserForm = (): JSX.Element => {
    const [form] = Form.useForm();

    const {addUserApiRequest, getUsersApiRequest} = useActions();
    const [userParameters, setUserParameters] = useState<GetUsersParametersType>();

    const options = useAppSelector(selectOptions);
    const users = useAppSelector(selectUsers);

    const props: FormProps = {
        user: undefined,
        users: users,
        options: options,
        vacationApprovers: undefined,
        header: 'Add User',
        buttonText: 'Add',
        form: form,
        onSubmit: (user: AddUserFormType): void => {
            addUserApiRequest(convertAddUserFormType(user));
            form.resetFields();
        },
        onSearch: (value: string): void => {
            setUserParameters({
                pagination: null,
                filters: null,
                search: {
                    field: 'email',
                    like: value
                },
                sort: null
            });
        },
        spinning: false
    };

    useEffect(() => {
        if (userParameters)
            getUsersApiRequest(userParameters);
    }, [userParameters])

    return (
        <>
            <UserForm {...props} />
        </>
    );
}

export default AddUserForm;
