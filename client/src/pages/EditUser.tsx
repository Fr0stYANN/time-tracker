import { Col, Row, message } from 'antd';
import { useAppSelector } from 'hooks';
import { Navigate, useParams } from 'react-router-dom';
import { selectUser } from 'store/selectors/userSelectors';
import EditUserForm from '../components/UserForm/EditUserForm';

const EditUser = (): JSX.Element => {
    const params = useParams();
    const userId = parseInt(params.id!);

    const user = useAppSelector(selectUser);

    if (user?.id === userId) {
        message.error("You can`t edit yourself");
        return (
            <Navigate 
                to="/timetracks"
                replace
            />
        )
    }
    
    return (
        <>
            <Row>
                <Col span={8} offset={8}>
                    <div>
                        <EditUserForm 
                            userId = {userId}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default EditUser;