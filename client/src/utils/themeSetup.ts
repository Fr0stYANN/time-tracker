import {ConfigProvider} from "antd";

export const themeSetup = (configProvider: typeof ConfigProvider) => {
    configProvider.config({
        theme: {
            primaryColor: '#6366ff',
        },
    });
}
