import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useActions } from 'hooks';
import { LoginUserInputType, LoginUserWithGoogleInputType } from '../types/userTypes';
import EmailFormItem from "../components/UserForm/EmailFormItem";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';


const Login = (): JSX.Element => {
    const { loginUserApiRequest, loginUserWithGoogleApiRequest, setNotification } = useActions();

    const submit = (values: unknown) => {
        loginUserApiRequest(values as LoginUserInputType);
    }

    const onSuccess = (res: CredentialResponse) => {
        loginUserWithGoogleApiRequest({
            clientId: res.clientId,
            credential: res.credential
        } as LoginUserWithGoogleInputType)
    }


    return (
        <>
            <Row>
                <Col span={8} offset={8}>
                    <div>
                        <Typography.Title title="h3">Sign in</Typography.Title>
                        <Form
                            layout="vertical"
                            autoComplete="off"
                            onFinish={submit}
                        >
                            <EmailFormItem value={undefined} />

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <div 
                                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
                                        alignItems: 'center', height: '40px'}}>
                                <Button
                                    type="primary" 
                                    htmlType="submit" 
                                    style={{ height: '37px' }}
                                >
                                    Sign in
                                </Button>
                                <div 
                                    style={{ height: '100%'}}
                                >
                                    <GoogleLogin
                                        onSuccess={onSuccess} 
                                        onError={() => {
                                            setNotification({
                                                message: 'An error occurred',
                                                description: 'Try again later',
                                                type: 'error'
                                            })
                                        }}      
                                        text="signin"
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Login;
