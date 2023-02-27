import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import 'antd/dist/antd.variable.css';
import './App.css';
import {ConfigProvider} from 'antd';
import {themeSetup} from './utils/themeSetup';
import {MainLayout} from 'components';
import 'moment/locale/en-gb';
import locale from 'antd/es/locale/en_GB';
import moment from 'moment';
import {browserHistory} from "utils/browserHistory";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

moment.updateLocale('en-gb', {
    week: {
        dow: 1
    }
});

themeSetup(ConfigProvider);

const App = (): JSX.Element => {
    return (
        <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
        >
            <ConfigProvider locale={locale}>
                <HistoryRouter history={browserHistory}>
                    <MainLayout/>
                </HistoryRouter>
            </ConfigProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
