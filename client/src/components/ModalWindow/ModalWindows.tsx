import {Modal} from "antd";
import AddDayModal from "./AddDayModal";
import DeleteDayModal from "./DeleteDayModal";
import {Moment} from "moment";
import EditDayModal from "./EditDayModal";

type PropertyType = {
    selectedDay: Moment;
    setSelectedDay: Function;
    setFormModalVisible: Function;
    setEditModalVisible: Function;
    setDeleteModalVisible: Function;
    FormModalVisible: boolean;
    EditModalVisible: boolean;
    DeleteModalVisible: boolean;
}

const ModalWindows = ({selectedDay, setSelectedDay,
        FormModalVisible, EditModalVisible, DeleteModalVisible,
        setFormModalVisible, setEditModalVisible, setDeleteModalVisible } : PropertyType) => {

    return(
        <>
            <Modal visible={FormModalVisible}
                 onCancel = {()=>setFormModalVisible(false)}
                 footer={null}
            >
                <AddDayModal
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    setModalVisible={setFormModalVisible}
                />
            </Modal>
            <Modal
                visible={DeleteModalVisible}
                onCancel = {()=>setDeleteModalVisible(false)}
                footer={null}
            >
                <DeleteDayModal
                    selectedDay={selectedDay}
                    setDeleteModalVisible={setDeleteModalVisible}
                />
            </Modal>
            <Modal
                visible={EditModalVisible}
                onCancel = {()=>setEditModalVisible(false)}
                footer={null}
            >
                <EditDayModal
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    setModalVisible={setEditModalVisible}
                />
            </Modal>
        </>

    )
}

export default ModalWindows;