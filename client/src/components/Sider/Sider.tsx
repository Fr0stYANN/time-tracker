import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import './Sider.css';
import { userMenuItems, userManagementMenuItems } from '../../hoc/userMenuItems';
import { useAppSelector } from '../../hooks';
import { selectUserOptions } from '../../store/selectors/userSelectors';
import { useEffect, useState } from 'react';
import { Option } from '../../utils/option';
import {useLocation} from "react-router-dom";
import {Path} from "../../utils/path";

const Sider = (): JSX.Element => {
    const options = useAppSelector(selectUserOptions);
    const [menuItems, setMenuItems] = useState<ItemType[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (options !== undefined) {
            for (const option of options) {
                switch(option.code) {
                    case Option.UserManagement:
                    case Option.WorkTimeManagement:
                    case Option.CalendarManagement: {
                        setMenuItems([...userMenuItems, ...userManagementMenuItems]);
                        break;
                    }
                }
            }
        } else {
            setMenuItems([...userMenuItems]);
        }
    }, [options]);

    return (
        <Layout.Sider className="sider">
            <Menu
                items={menuItems}
                defaultSelectedKeys={[location.pathname === '/' ? Path.TIMETRACKS : location.pathname]}
                mode="inline"
            />
        </Layout.Sider>
    );
};

export default Sider;
