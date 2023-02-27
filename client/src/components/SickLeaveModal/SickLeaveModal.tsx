import { DatePicker, Modal } from 'antd';
import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import {RangePickerProps} from "antd/es/date-picker";

type Props = {
    title: string
    isVisible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    onCancelCallback?: () => void
    okText: string,
    payload: any,
    handleOnOkClick: (startDate: string, endDate: string, id: number) => void
}

const SickLeaveModal = ({title, isVisible, setVisible, okText, payload, handleOnOkClick, onCancelCallback}: Props): JSX.Element => {
    const [startDateRange, setStartDateRange] = useState<Moment | undefined>(undefined);
    const [endDateRange, setEndDateRange] = useState<Moment | undefined>(undefined);

    const onChangeRangePicker: RangePickerProps['onChange'] = (range, rangeString) => {
        setStartDateRange(moment(rangeString[0]));
        setEndDateRange(moment(rangeString[1]));
    };

    const getDefaultPickerValue = () => {
        if (!payload?.startDate || !payload?.endDate) {
            return;
        }

        return {
            defaultValue: [
                moment.utc(payload?.startDate).local(),
                moment.utc(payload?.endDate).local()
            ] as RangePickerProps['defaultPickerValue']
        };
    }

    const onOk = () => {
        const startDate: string = moment(startDateRange).format("YYYY-MM-DD");
        const endDate: string = moment(endDateRange).format("YYYY-MM-DD");

        handleOnOkClick(startDate, endDate, payload?.id);

        if (onCancelCallback) {
            onCancelCallback();
        }

        setVisible(false);
    }

    const onCancel = () => {
        setVisible(false);

        setStartDateRange(undefined);
        setEndDateRange(undefined);

        if (onCancelCallback) {
            onCancelCallback();
        }
    };

    return (
        <Modal
            title={title}
            visible={isVisible}
            onCancel={onCancel}
            okText={okText}
            destroyOnClose={true}
            onOk={onOk}
        >
            <DatePicker.RangePicker
                format="YYYY-MM-DD"
                onChange={onChangeRangePicker}
                {...getDefaultPickerValue()}
            />
        </Modal>
    );
}

export default SickLeaveModal;