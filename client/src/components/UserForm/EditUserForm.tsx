import {useEffect, useState} from 'react';
import moment from 'moment';
import {Form} from 'antd';
import {useActions, useAppSelector} from 'hooks';
import {selectOptions} from 'store/selectors/optionsSelector';
import {GetUsersParametersType, UpdateUserFormType, User} from 'types/userTypes';
import {selectUsers, selectVacationApprovers} from 'store/selectors/userSelectors';
import UserForm, {FormProps} from './UserForm';
import {convertEditUserFormType} from 'utils/converters';
import {apiRequest} from 'api/common/apiRequest';
import {getUserByIdQuery} from 'api/queries/usersQueries';
import FullPageLoader from 'components/FullPageLoader/FullPageLoader';

type PropsType = {
    userId: number
}

const EditUserForm = (props: PropsType): JSX.Element => {
    const {
        userId
    } = props;

    const [form] = Form.useForm();

    const [userParameters, setUserParameters] = useState<GetUsersParametersType>();
    const [user, setUser] = useState<User>();
    const [formLoading, setFormLoading] = useState<boolean>(false);

    const users = useAppSelector(selectUsers);
    const vacationApprovers = useAppSelector(selectVacationApprovers);
    const options = useAppSelector(selectOptions);

    const {
        updateUserApiRequest,
        getOptionsApiRequest,
        getVacationApproversApiRequest,
        getUsersApiRequest,
        setNotification
    } = useActions();

    const formProps = {
        user: user,
        options: options,
        vacationApprovers: vacationApprovers,
        header: 'Edit User',
        buttonText: 'Edit',
        form: form,
        users: users,
        onSubmit: (user: UpdateUserFormType): void => {
            updateUserApiRequest(convertEditUserFormType(user));
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
        spinning: formLoading
    } as FormProps;

    useEffect(() => {
        setFormLoading(true);
        apiRequest(getUserByIdQuery(userId, undefined))
            .then(json => {
                setUser(json.data.user.getById as User);
            })
            .catch(error => setNotification({
                message: 'An error occured',
                description: error,
                type: 'error'
            }));

        getVacationApproversApiRequest(userId);
    }, [userId]);

    useEffect(() => {
        form.setFieldsValue({
            id: user?.id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            workTypeId: user?.workType.id.toString(),
            employmentDate: moment(`${user?.employmentDate}`, 'YYYY-MM-DD'),
            options: user?.options?.map(opt => opt.id)
        });
        getOptionsApiRequest();
        setFormLoading(false);
    }, [user])

    useEffect(() => {
        if (vacationApprovers) {
            form.setFieldsValue({
                vacationApprovers: vacationApprovers?.map(approver => approver.email)
            })
        }
    }, [vacationApprovers])

    useEffect(() => {
        if (userParameters)
            getUsersApiRequest(userParameters);
    }, [userParameters])

    if (user === null) return <FullPageLoader/>

    return (
        <>
            <UserForm {...formProps} />
        </>
    );
}

export default EditUserForm;
