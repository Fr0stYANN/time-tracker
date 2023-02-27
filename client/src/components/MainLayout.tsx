import { Layout, notification } from 'antd';
import { AppRouter, Header, Sider } from 'components';
import { useAppSelector, useActions } from 'hooks';
import { selectUser } from 'store/selectors/userSelectors';
import { useEffect } from 'react';

import getCookie from '../helperFunctions/getCookie';
import { selectNotification } from '../store/selectors/notificationSelector';
import { DisplayNotification } from '../types/notificationTypes';
import { IconType } from 'antd/lib/notification';

const MainLayout = (): JSX.Element => {
    const user = useAppSelector(selectUser);
    const {setLoading} = useActions();

    const { refreshUserApiRequest, removeNotification } = useActions();
    const notify = useAppSelector(selectNotification);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const refreshToken = getCookie('refreshToken');

            if (refreshToken) {
                refreshUserApiRequest(refreshToken)
            }
        } else {
            setLoading({isAuthLoaded: true});
        }
    }, [])

    const openNotification = (notify: DisplayNotification) => {
        notification[notify.type as IconType]({
            message: notify.message,
            description: notify.description,
            duration: 3,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        for (const n of notify) {
            openNotification(n)
            removeNotification(n.id);
        }
    }, [notify]);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header />
            <Layout>
                { user && <Sider />}
                <AppRouter />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
