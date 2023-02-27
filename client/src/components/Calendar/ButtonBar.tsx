import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Space} from "antd";

type PropertyType = {
    setFormModalVisible: Function;
    setEditModalVisible: Function;
    setDeleteModalVisible: Function;
}

const ButtonBar = ({setFormModalVisible, setEditModalVisible, setDeleteModalVisible}: PropertyType) => {
    return (
        <>
            <Space>
                <Button type={"primary"}
                        size={"large"}
                        onClick={() => setFormModalVisible()}
                >
                    <PlusOutlined/>
                </Button>
                <Button type={"default"}
                        size={"large"}
                        onClick={() => setEditModalVisible()}
                >
                    <EditOutlined/>
                </Button>
                <Button type={"default"}
                        size={"large"}
                        onClick={() => setDeleteModalVisible()}
                >
                    <DeleteOutlined/>
                </Button>
            </Space>
        </>
    )
}

export default ButtonBar;
