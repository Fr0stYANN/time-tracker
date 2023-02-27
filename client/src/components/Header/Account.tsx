import { useActions, useAppSelector } from 'hooks';
import { selectUser } from 'store/selectors/userSelectors';
import { Avatar, Typography, Space, Dropdown, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utils/path';
import getCookie from 'helperFunctions/getCookie';

const Account = (): JSX.Element => {
    const user = useAppSelector(selectUser);

    const { revokeUserApiRequest, clearVacationState } = useActions();

    const navigate = useNavigate();

    const logoutUser = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = getCookie('refreshToken');

        if (accessToken && refreshToken){
            revokeUserApiRequest({accessToken: accessToken, refreshToken: refreshToken});
            clearVacationState();
            navigate(Path.LOGIN, { replace: true })
        }
    }

    const menuItems: ItemType[] = [
        {
            key: 1,
            label: (
                <div onClick={logoutUser}>
                    <Space><LogoutOutlined /><Typography>Logout</Typography></Space>
                </div>
            )
        }
    ]

    const overlay = (
        <Menu items={menuItems}/>
    );

    return (
        <Dropdown overlay={overlay}>
            <Space style={{cursor: 'default'}}>
                <Typography.Text>{user?.firstname} {user?.lastname}</Typography.Text>
                <Avatar>{user?.firstname[0]}{user?.lastname[0]}</Avatar>
            </Space>
        </Dropdown>
    );
};

export default Account;
