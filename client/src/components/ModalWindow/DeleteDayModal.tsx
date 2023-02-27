import {Button, DatePicker, Form, Row, Select, Space} from "antd";
import locale from "antd/es/date-picker/locale/en_GB";
import {Moment} from "moment";
import { CalendarDataType } from "types/calendarTypes";
import {useActions} from "hooks";
import searchDateInState from "../../helperFunctions/searchDateInState";

type PropertyType = {
    selectedDay: Moment;
    setDeleteModalVisible: Function;
}

const DeleteDayModal = ({selectedDay, setDeleteModalVisible}:PropertyType) => {
    const { deleteDayApiRequest } = useActions();
    const dayInfo : CalendarDataType = searchDateInState(selectedDay)!;

    const submitDeleteForm = (date: string) => {
        deleteDayApiRequest(date);
    }

    const preDeleteDayForm = () => {
        submitDeleteForm(selectedDay.format("YYYY-MM-DD"));
        setDeleteModalVisible(false);
    }

    return(
        <>
            <Form onFinish={preDeleteDayForm}>
                <Form.Item>
                    <h3>DELETE SPECIAL DAY</h3>
                </Form.Item>
                <label>Date of deleting day:</label>
                <Row>
                    <Space>
                        <Form.Item>
                            <Select value={"day"} disabled>
                                <Select.Option value="day" key="1">Day</Select.Option>
                                <Select.Option value="range" key="2">Range</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <DatePicker
                                locale={locale}
                                value={dayInfo?.date}
                                disabled
                            />
                        </Form.Item>
                    </Space>
                </Row>
                <Form.Item>
                    <label>Type of deleting day:</label>
                    <Select
                            value={dayInfo?.dayType.name}
                            disabled
                    >
                        <Select.Option value={dayInfo?.dayType.name} key={dayInfo?.dayType.id}>{dayInfo?.dayType.name}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div>Works hours: {dayInfo?.hoursToWork}</div>
                </Form.Item>
                <Row justify="end">
                    <Space>
                        <div>Are you want delete this day from calendar?</div>
                        <Form.Item>
                            <Button type="default" onClick={()=>setDeleteModalVisible(false)} style={{ marginTop: 20 }}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" danger htmlType="submit" style={{ marginTop: 20 }}>
                                Delete
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </>
    )
}

export default DeleteDayModal;
