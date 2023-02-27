import {Layout, Typography} from "antd";
import {useAppSelector} from "hooks";
import {selectUser} from "store/selectors/userSelectors";
import './Header.css';
import Account from "./Account";

const Header = (): JSX.Element => {
    const user = useAppSelector(selectUser);

    return (
        <Layout.Header className="header" >
            <div className="header__logo">
                <Typography.Text>Time tracker</Typography.Text>
            </div>
            {
                user ?
                    <Account/> :
                    null
            }
        </Layout.Header>
    );
}

export default Header;
