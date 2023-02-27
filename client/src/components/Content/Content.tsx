import {Layout} from "antd";
import {useOutlet} from "react-router-dom";

import './Content.css';
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import {useAppSelector} from "hooks";
import {selectLoading} from "store/selectors/loadingSelectors";

const Content = (): JSX.Element => {
    const Outlet = useOutlet();
    const isLoading = useAppSelector(selectLoading);

    if (isLoading.isPageLoading) {
        return <FullPageLoader/>;
    }

    return (
        <Layout.Content className="content">
            {Outlet}
        </Layout.Content>
    );
};

export default Content;
