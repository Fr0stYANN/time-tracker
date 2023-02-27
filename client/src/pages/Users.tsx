import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import UsersList from 'components/UsersList/UsersList';
import {useActions} from 'hooks';
import {TableOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Path} from "utils/path";
import DownloadUsersFile from 'components/UserListFile/DownloadUsersFile';

const Users = (): JSX.Element => {
    const { getOptionsApiRequest } = useActions();
    const [downloadExcelModalVisible, setDownloadExcelModalVisible] = useState<boolean>(false);

    const onDownloadExcelFile = () => {
        setDownloadExcelModalVisible(true);
    }

    return (
        <>
            <Row justify='space-between' style={{marginBottom: '15px'}}>
                <Button
                    type="primary"
                    onClick={() => onDownloadExcelFile()}
                >Download <TableOutlined /></Button>
                <Col>
                    <Link to={Path.USER_ADD}
                        onClick={() => getOptionsApiRequest()}>
                        <Button type="primary">Add User</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <UsersList />
                </Col>
            </Row>
            <DownloadUsersFile
                modalVisible={downloadExcelModalVisible}
                setModalVisible={setDownloadExcelModalVisible}
            />
        </>
    );
}

export default Users;
