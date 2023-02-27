import {Button, DatePicker, Form, Row, Select, Space} from "antd";
import {useState} from "react";
import moment, {Moment} from "moment";
import {DayType, CalendarRangeInputType} from "types/calendarTypes";
import SliderItem from "../Calendar/SliderItem";
import locale from "antd/es/date-picker/locale/en_GB";
import {useActions, useAppSelector} from "hooks";
import {selectDayType} from "store/selectors/dayTypeSelector";

type PropertyType = {
    selectedDay: Moment;
    setSelectedDay: Function;
    setModalVisible: Function;
}

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
type RangeValue = [Moment | null, Moment | null] | null;

const AddDayModal = ({selectedDay, setSelectedDay, setModalVisible}: PropertyType) => {
    const listOfType: DayType[] = useAppSelector(selectDayType);

    const {addSingleDayApiRequest, addRangeDayApiRequest} = useActions();
    const [methodSelectDay, setMethodSelectDay] = useState("day");
    const [rangeDay, setRangeDay] = useState<RangeValue>([selectedDay!, null]);
    const [dayType, setDayType] = useState<DayType>(listOfType[0]);
    const [worksHours, setWorksHours] = useState<number>(8);

    const onChangeDate = (date: Moment) => {
        setSelectedDay(date);
    }

    const onChangeDayType = (value: string) => {
        listOfType.map((type) => type.name === value && setDayType(type))
    }

    const onChangeRange = (date: RangeValue) => {
        setRangeDay(date);
    }

    const addSingleDaySubmitForm = (values: { date: string; dayTypeId: number; hoursToWork: number }) => {
        addSingleDayApiRequest(values);
    }

    const addRangeDaySubmitForm = (values: CalendarRangeInputType) => {
        addRangeDayApiRequest(values);
    }

    const preSubmitForm = () => {
        methodSelectDay === "day" ?
            addSingleDaySubmitForm({
                date: selectedDay.format(dateFormat),
                dayTypeId: dayType.id,
                hoursToWork: worksHours
            })
            : addRangeDaySubmitForm({
                startDate: rangeDay && rangeDay[0]?.format(dateFormat),
                endDate: rangeDay && rangeDay[1]?.format(dateFormat),
                dayTypeId: dayType.id,
                hoursToWork: worksHours
            });
        setModalVisible(false);
    }

    return (
        <>
            <Form onFinish={preSubmitForm}>
                <Form.Item>
                    <h3>ADD SPECIAL DAY</h3>
                </Form.Item>
                <label>Date/s of adding day:</label>
                <Row>
                    <Space>
                        <Form.Item>
                            <Select onChange={(value) => setMethodSelectDay(value)}
                                    value={methodSelectDay}
                            >
                                <Select.Option value="day" key="1">Day</Select.Option>
                                <Select.Option value="range" key="2">Range</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            {methodSelectDay === "day"
                                ?
                                <DatePicker
                                    locale={locale}
                                    value={selectedDay}
                                    onChange={(date) => onChangeDate(date!)}
                                />
                                :
                                <RangePicker
                                    locale={locale}
                                    value={rangeDay}
                                    onChange={(date => onChangeRange(date))}
                                    defaultValue={[moment(selectedDay, dateFormat), moment()]}
                                />
                            }
                        </Form.Item>
                    </Space>
                </Row>
                <Form.Item>
                    <label>Type of adding day:</label>
                    <Select onChange={onChangeDayType}
                            value={dayType.name}
                    >
                        {listOfType.map((type) => {
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
                            <Button type="default" onClick={() => setModalVisible(false)} style={{marginTop: 20}}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
                                Create Day
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </>
    )
}

export default AddDayModal;
