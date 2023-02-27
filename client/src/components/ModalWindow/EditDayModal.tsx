import {Button, DatePicker, Form, Row, Select, Space} from "antd";
import {useState} from "react";
import {Moment} from "moment";
import {DayType} from "types/calendarTypes";
import SliderItem from "../Calendar/SliderItem";
import locale from "antd/es/date-picker/locale/en_GB";
import {useActions, useAppSelector} from "hooks";
import {CalendarDataType, CalendarInputType} from "types/calendarTypes";
import {selectDayType} from "store/selectors/dayTypeSelector";
import searchDateInState from "helperFunctions/searchDateInState";

type PropertyType = {
    selectedDay: Moment;
    setSelectedDay: Function;
    setModalVisible: Function;
}

const dateFormat = 'YYYY-MM-DD';

const EditDayModal = ({selectedDay, setSelectedDay, setModalVisible} : PropertyType) => {
    const listOfType : DayType[] = useAppSelector(selectDayType);

    const daysInfo : CalendarDataType = searchDateInState(selectedDay)!;
    const { editDayApiRequest } = useActions();
    const [dayType, setDayType] = useState<DayType>(daysInfo?.dayType);
    const [worksHours, setWorksHours] = useState<number>(daysInfo?.hoursToWork);

    const onChangeDate = (date: Moment) => {
        setSelectedDay(date);
    }

    const onChangeDayType = (value: string) => {
        listOfType.map((type) => type.name === value && setDayType(type))
    }

    const preSubmitForm = () => {
        let updatedData : CalendarInputType = {
            id:daysInfo.id,
            date:selectedDay.format(dateFormat),
            dayTypeId:dayType.id,
            hoursToWork:worksHours
        };
        editDayApiRequest(updatedData);
        setModalVisible(false);
    }

    return(
        <>
            <Form onFinish={preSubmitForm}>
                <Form.Item>
                    <h3>EDIT SPECIAL DAY</h3>
                </Form.Item>
                <label>Date of editing day:</label>
                <Row>
                    <Space>
                        <Form.Item>
                                <DatePicker
                                    locale={locale}
                                    value={selectedDay}
                                    onChange={(date) => onChangeDate(date!)}
                                />
                        </Form.Item>
                    </Space>
                </Row>
                <Form.Item>
                    <label>Type of adding day:</label>
                    <Select onChange={onChangeDayType}
                            value={dayType?.name}
                    >
                        { listOfType.map((type) => {
                            return <Select.Option value={type.name} key={type.id}>{type.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div>Works hours: {worksHours}</div>
                    <SliderItem
                        dayType={dayType.name}
                        setWorksHours={setWorksHours}
                    />
                </Form.Item>
                <Row justify="end">
                    <Space>
                        <Form.Item>
                            <Button type="default" onClick={()=>setModalVisible(false)} style={{ marginTop: 20 }}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
                                Edit Day
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </>
    )
}

export default EditDayModal;
