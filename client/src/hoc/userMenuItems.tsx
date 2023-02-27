import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import { Path } from '../utils/path';
import { Space } from 'antd';
import {
    CalendarOutlined,
    FieldTimeOutlined,
    MedicineBoxOutlined,
    SketchOutlined,
    TeamOutlined
} from '@ant-design/icons';

export const userManagementMenuItems: ItemType[] = [
    {
        key: Path.USERS,
        label: (
            <div>
                {
                    <Link to={Path.USERS}>
                        <Space><TeamOutlined />Users</Space>
                    </Link>
                }
            </div>
        )
    }
];

export const userMenuItems: ItemType[] = [
    {
        key: Path.TIMETRACKS,
        label: (
            <Link to={Path.TIMETRACKS}>
                <Space><FieldTimeOutlined />Dashboard</Space>
            </Link>
        )
    },
    {
        key: Path.CALENDAR,
        label: (
            <Link to={Path.CALENDAR}>
                <Space><CalendarOutlined />Calendar</Space>
            </Link>
        )
    },
    {
        key: Path.VACATIONS,
        label: (
            <Link to={Path.VACATIONS}>
                <Space><SketchOutlined />Vacations</Space>
            </Link>
        )
    },
    {
        key: Path.SICK_LEAVES,
        label: (
            <Link to={Path.SICK_LEAVES}>
                <Space><MedicineBoxOutlined />Sick Leaves</Space>
            </Link>
        )
    }
];
