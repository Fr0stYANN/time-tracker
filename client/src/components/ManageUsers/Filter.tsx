import { Select, Space } from 'antd';
import { useActions } from "../../hooks";

const Filter = (): JSX.Element => {
    const { setParameters } = useActions();

    const onChange = (value?: string) => {
        setParameters( { workTypeId: Number(value) });
    }

    return (
        <Space direction={'vertical'}>
            <Select defaultValue={'null'} onChange={onChange} style={{width: 120}}>
                <Select.Option value={'null'}>Filter By</Select.Option>
                <Select.Option value={'1'} >Full time</Select.Option>
                <Select.Option value={'2'} >Part time</Select.Option>
            </Select>
        </Space>
    );
}

export default Filter;