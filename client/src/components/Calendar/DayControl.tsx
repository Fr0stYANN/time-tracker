import ButtonBar from "./ButtonBar";
import {useState} from "react";
import ModalWindows from "../ModalWindow/ModalWindows";
import {Moment} from "moment";
import {CalendarDataType} from "types/calendarTypes";
import searchDateInState from "../../helperFunctions/searchDateInState";

type PropertyType = {
    selectedDay: Moment;
    setSelectedDay: Function;
}

const DayControl = ({selectedDay, setSelectedDay}: PropertyType) => {
    const [FormModalVisible, setFormModalVisible] = useState(false);
    const [EditModalVisible, setEditModalVisible] = useState(false);
    const [DeleteModalVisible, setDeleteModalVisible] = useState(false);
    let daysInfo: CalendarDataType = searchDateInState(selectedDay)!;

    const FormModalVisibleCheck = () => {
        daysInfo ?
            window.confirm("This day have info. Would change him?") && setEditModalVisible(true) :
            setFormModalVisible(true);
    }

    const EditModalVisibleCheck = () => {
        daysInfo && setEditModalVisible(true);
    }

    const DeleteModalVisibleCheck = () => {
        daysInfo && setDeleteModalVisible(true);
    }

    return (
        <>
            <ButtonBar
                setFormModalVisible={FormModalVisibleCheck}
                setEditModalVisible={EditModalVisibleCheck}
                setDeleteModalVisible={DeleteModalVisibleCheck}
            />
            <ModalWindows
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                FormModalVisible={FormModalVisible}
                EditModalVisible={EditModalVisible}
                DeleteModalVisible={DeleteModalVisible}
                setFormModalVisible={setFormModalVisible}
                setEditModalVisible={setEditModalVisible}
                setDeleteModalVisible={setDeleteModalVisible}
            />
        </>
    )
}

export default DayControl;
