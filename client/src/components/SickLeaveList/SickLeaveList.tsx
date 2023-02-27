import { Table } from 'antd';

type Props = {
    columns: any
    data: any
    isLoading: boolean
}

const SickLeaveList = ({columns, data, isLoading}: Props): JSX.Element => {
    return (
        <Table columns={columns} dataSource={data} loading={isLoading} pagination={false} />
    );
}

export default SickLeaveList;