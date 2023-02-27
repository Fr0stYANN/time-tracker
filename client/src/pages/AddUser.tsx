import { Col, Row } from 'antd';
import AddUserForm from '../components/UserForm/AddUserForm';

const AddUser = (): JSX.Element => {
    return (
      <>
          <Row>
              <Col span={8} offset={8}>
                  <div>
                      <AddUserForm />
                  </div>
              </Col>
          </Row>
      </>
    );
}

export default AddUser;