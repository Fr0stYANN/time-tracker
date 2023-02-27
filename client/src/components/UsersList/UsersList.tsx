import React, {useEffect, useRef} from 'react';
import {useActions, useAppSelector} from 'hooks';
import {useNavigate} from 'react-router-dom';
import './UserList.css';

import {
    Button,
    Dropdown,
    Input,
    InputRef,
    Menu,
    Modal,
    Space,
    Table,
    TablePaginationConfig,
    TableProps
} from 'antd';
import {
    CheckOutlined,
    EditOutlined, EllipsisOutlined,
    FieldTimeOutlined, LineChartOutlined,
    MedicineBoxOutlined,
    SearchOutlined,
    SketchOutlined, StopOutlined
} from '@ant-design/icons';

import {FilterConfirmProps} from 'antd/es/table/interface';
import {ColumnType} from 'antd/lib/table';

import filtersUsersTable from 'utils/filtersUsersTable';
import normalizeTableData from 'utils/normalizeTableData';
import {Path} from 'utils/path';
import {Option} from "utils/option";

import {selectUserParameters} from 'store/selectors/usersParametersSelctor';
import {selectTotalUsersLength, selectUser, selectUsers} from 'store/selectors/userSelectors';
import {selectLoading} from "store/selectors/loadingSelectors";
import isHaveOption from "store/selectors/isHaveOption";
import {ItemType} from 'antd/lib/menu/hooks/useItems';
import {User} from "types/userTypes";

const UsersList = (): JSX.Element => {
    const {confirm} = Modal;
    const {Column} = Table;

    const {setActivationStatusUserApiRequest, setParameters, getUsersApiRequest, removeEditUser} = useActions();

    const navigate = useNavigate();
    const isWtmOption = useAppSelector(isHaveOption(Option.WorkTimeManagement));
    const userParameters = useAppSelector(selectUserParameters);
    const totalUsersLength = useAppSelector(selectTotalUsersLength);
    const users = useAppSelector(selectUsers);
    const user = useAppSelector(selectUser);

    const generateUmItems = (record: User): ItemType[] => {
        let menuItems: ItemType[] = [];
        if (user?.id! !== record.id) {
            menuItems = [
                {
                    key: 2,
                    label: (
                        <div
                            onClick={(event) => onSetActivationStatusClick(event, record)}
                        >
                            {record.isActivated
                                ? (
                                    <Space>
                                        <StopOutlined/>
                                        Deactivate
                                    </Space>
                                )
                                : (
                                    <Space>
                                        <CheckOutlined/>
                                        Activate
                                    </Space>
                                )
                            }

                        </div>
                    )
                }
            ];

            if (record.isActivated) {
                menuItems.push({
                    key: 1,
                    label: (
                        <div
                            onClick={(event) => {
                                navigate(`${Path.USER_EDIT}/${record.id}`);
                            }}
                        >
                            <Space>
                                <EditOutlined/>
                                Edit
                            </Space>
                        </div>
                    ),
                });
            }
        }
        return menuItems;
    }

    const generateWtManagementItems = (record: User) => {
        let menuItems: ItemType[] = [];

        if (isWtmOption?.length! > 0) {
            menuItems =
                [
                    {
                        key: 3,
                        label: (
                            <div
                                onClick={(event) => {
                                    user?.id === record.id ?
                                        navigate(`${Path.VACATIONS}`) :
                                        navigate(`${Path.VACATIONS}/${record.id}`);
                                }}
                            >
                                <Space>
                                    <SketchOutlined/>
                                    Vacations
                                </Space>
                            </div>
                        )
                    },
                    {
                        key: 4,
                        label: (
                            <div
                                onClick={(event) =>
                                    navigate(`${Path.TIMETRACKS}/${record.id}`)}
                            >
                                <Space>
                                    <FieldTimeOutlined/>
                                    TimeTracks
                                </Space>
                            </div>
                        )
                    },
                    {
                        key: 5,
                        label: (
                            <div
                                onClick={(event) =>
                                    navigate(`${Path.SICK_LEAVES}/${record.id}`)}
                            >
                                <Space>
                                    <MedicineBoxOutlined/>
                                    Sick Leaves
                                </Space>
                            </div>
                        )
                    },
                    {
                        key: 6,
                        label: (
                            <div
                                onClick={(event) =>
                                    navigate(`${Path.WORK_CHART}/${record.id}`)}
                            >
                                <Space>
                                    <LineChartOutlined/>
                                    Work chart
                                </Space>
                            </div>
                        )
                    }
                ]
        }

        return menuItems;
    }

    const onSetActivationStatusClick = (event: any, record: User) => {
        confirm({
            title: 'Warning',
            content: 'Are you sure you want change activation status?',
            centered: true,
            onOk() {
                setActivationStatusUserApiRequest({id: Number(record.id), isActivated: !record.isActivated});
                getUsersApiRequest(userParameters);
            },
            onCancel() {
            },
        });
    }

    useEffect(() => {
        getUsersApiRequest(userParameters);
        //removeEditUser(); // Idea of this step: after updating user, app redirects him to users page and remove editUser from state. It is very important to remove editUser after update action end with success. TODO: Think of better solution
    }, [userParameters]);

    const pagination: TablePaginationConfig = {
        current: userParameters.pagination!.page,
        pageSize: userParameters.pagination!.pageSize,
        total: totalUsersLength
    };

    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof User
    ) => {
        confirm();

        setParameters({
            search: {
                field: dataIndex,
                like: selectedKeys[0]
            }
        })
    };

    const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
        clearFilters();
        confirm();
        setParameters({
            search: null
        });
    };


    const getColumnSearchProps = (dataIndex: keyof User): ColumnType<User> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => {
            return (
                <div style={{padding: 8}}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                            size="small"
                            style={{width: 90}}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            );
        },
        filterIcon: () => {
            return (
                <SearchOutlined/>
            );
        }
    })

    const onTableChange: TableProps<User>['onChange'] = (pagination: any, filters: any, sorter: any) => {
        setParameters(normalizeTableData(pagination, filters, sorter));
    }

    const isLoading = useAppSelector(selectLoading);

    const menu = (record: User) => {
        const umItems = generateUmItems(record);
        const wtItems = generateWtManagementItems(record);

        return (
            <Menu
                items={[...umItems, ...wtItems]}
            />
        )
    };

    return (
        <>
            <Table
                loading={isLoading.isUsersLoading}
                dataSource={users}
                pagination={pagination}
                style={{marginBottom: 30}}
                onChange={onTableChange}
                rowKey="id"
                rowClassName={(record) => record.isActivated ? "" : "table__deactive-record"}
            >
                <Column
                    title="Firstname"
                    dataIndex="firstname"
                    key="firstname"
                    {...getColumnSearchProps('firstname')}
                    sorter={{multiple: 3}}
                    width="17%"
                />
                <Column
                    title="Lastname"
                    dataIndex="lastname"
                    key="lastname"
                    {...getColumnSearchProps('lastname')}
                    sorter={{multiple: 2}}
                    width="17%"
                />
                <Column
                    title="Email"
                    dataIndex="email"
                    key="email"
                    {...getColumnSearchProps('email')}
                    width="23%"
                />
                <Column
                    title="Employment Date"
                    dataIndex="employmentDate"
                    key="employmentDate"
                    sorter={{multiple: 1}}
                    width="18%"
                />
                <Column
                    title="Work type"
                    dataIndex="workType"
                    key="workTypeId"
                    filters={filtersUsersTable}
                    width="15%"
                    render={(value: string, record: User) => record?.workType?.name}
                />
                <Column
                    title="Actions"
                    key="actions"
                    render={(value) => (
                        <Space>
                            <Dropdown overlay={menu(value)}>
                                <a onClick={e => e.preventDefault()}>
                                    <Button
                                        icon={<EllipsisOutlined style={{fontSize: 20}}/>}
                                        size={"middle"}
                                        shape={"circle"}
                                        type={"text"}
                                    />
                                </a>
                            </Dropdown>
                        </Space>
                    )}
                    width="10%"
                />
            </Table>
        </>
    );
}

export default UsersList;
