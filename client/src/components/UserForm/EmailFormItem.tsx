import { Form, Input } from 'antd';

type Props = {
    value: string | undefined
}

const EmailFormItem = ({value}: Props): JSX.Element => {
    return (
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', validateTrigger: 'onBlur', message: 'email is not valid' }]}
            initialValue={value}
        >
            <Input />
        </Form.Item>
    );
}

export default EmailFormItem;