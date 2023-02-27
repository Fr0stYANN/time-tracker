import React, {useEffect, useState} from 'react';
import {Modal, DatePicker, Select, Row, Col, Typography} from "antd";
import {apiRequest, ApiRequestParams} from "api/common/apiRequest";

import {RangePickerProps} from "antd/es/date-picker";
import {
    CreateTimeTrackPayload,
    DeleteTimeTrackPayload,
    TimeTrack,
    TimeTrackType,
    UpdateTimeTrackPayload
} from "types/timeTracksTypes";
import moment, {Moment} from "moment";
import {useActions} from "hooks";
import {getTimeTrackTypesQuery} from "../../api/queries/timeTrackTypeQueries";

interface Props {
    title: string
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    type: "create" | "edit" | "delete",
    payload: any,
    onCancelCallback?: () => void,
    okText?: string,
    mutation: {
        api: any
        name: string
    },
    isVisibleTimeTrackType?: boolean
}

const TimeTrackModal = (props: Props) => {
    const {
        title,
        visible,
        setVisible,
        onCancelCallback,
        type,
        payload,
        okText = "Ok",
        mutation,
        isVisibleTimeTrackType = false
    } = props;

    const [startDateRange, setStartDateRange] = useState<Moment | undefined>(undefined);
    const [endDateRange, setEndDateRange] = useState<Moment | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [timeTrackTypes, setTimeTrackTypes] = useState<TimeTrackType[] | null>(null);
    const [currentTimeTrackType, setCurrentTimeTrackType] = useState<number | undefined>(undefined);

    const {setNotification, addTimeTrack, updateTimeTrack, deleteTimeTrack} = useActions();

    useEffect(() => {
        getTimeTrackTypesApiRequest();
    }, [])

    const getTimeTrackTypesApiRequest = async () => {
        const response = await apiRequest({...getTimeTrackTypesQuery()} as ApiRequestParams);
        setTimeTrackTypes(response.data.timeTrackType.getAll as TimeTrackType[]);
    }

    const timeTrackerApiRequest = async () => {
        let apiRequestParams;

        switch (type) {
            case "create": {
                const apiPayload = {
                    userId: payload.userId,
                    startDate: moment(startDateRange).utc().format("YYYY-MM-DDTHH:mm:ss"),
                    endDate: moment(endDateRange).utc().format("YYYY-MM-DDTHH:mm:ss"),
                    timeTrackTypeId: currentTimeTrackType === 1 ? undefined : currentTimeTrackType
                } as CreateTimeTrackPayload;

                apiRequestParams = mutation.api(apiPayload);
                break;
            }
            case "edit": {
                const apiPayload = {
                    id: payload.id,
                    startDate: moment(startDateRange).utc().format("YYYY-MM-DDTHH:mm:ss"),
                    endDate: moment(endDateRange).utc().format("YYYY-MM-DDTHH:mm:ss"),
                    timeTrackTypeId: currentTimeTrackType === undefined ? 1 : currentTimeTrackType
                } as UpdateTimeTrackPayload;

                apiRequestParams = mutation.api(apiPayload);
                break;
            }
            case "delete": {
                const apiPayload = payload.id as DeleteTimeTrackPayload;

                apiRequestParams = mutation.api(apiPayload);
                break;
            }
        }

        setIsLoading(true);
        setCurrentTimeTrackType(undefined);
        return await apiRequest(apiRequestParams as ApiRequestParams);
    };

    const onOk = () => {
        timeTrackerApiRequest()
            .then(json => {
                setIsLoading(false);
                switch (type) {
                    case "create": {
                        addTimeTrack(json.data.timeTrack[mutation.name] as TimeTrack)
                        setNotification({
                            message: "Success",
                            description: "Time track successfully created"
                        });
                        break;
                    }
                    case "edit": {
                        updateTimeTrack(json.data.timeTrack[mutation.name] as TimeTrack)
                        setNotification({
                            message: "Success",
                            description: "Time track successfully updated"
                        });
                        break;
                    }
                    case "delete": {
                        deleteTimeTrack(payload.id)
                        setNotification({
                            message: "Success",
                            description: "Time track successfully deleted"
                        });
                        break;
                    }
                }
                onCancel();

            })
            .catch(error => {
                setIsLoading(false);
                setNotification({
                    message: "Error",
                    description: error,
                    type: "error"
                });

            });
    }

    const onCancel = () => {
        setVisible(false);
        setCurrentTimeTrackType(1);
        setStartDateRange(undefined);
        setEndDateRange(undefined);

        if (onCancelCallback) {
            onCancelCallback();
        }
    };

    const onChangeRangePicker: RangePickerProps['onChange'] = (range, rangeString) => {
        setStartDateRange(moment(rangeString[0]));
        setEndDateRange(moment(rangeString[1]));
    };

    const getDefaultPickerValue = () => {
        if (!payload?.startDate || !payload?.endDate) {
            return;
        }

        return {defaultValue: [moment.utc(payload?.startDate).local(), moment.utc(payload?.endDate).local()] as RangePickerProps['defaultPickerValue']};
    }

    const getDefaultTypeSelectValue = () => {
        if (payload?.timeTrackTypeId) {
            return payload.timeTrackTypeId;
        }

        return timeTrackTypes === null ? undefined : timeTrackTypes[0].id;
    }


    return (
        <Modal
            title={title}
            visible={visible}
            okText={okText}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}
            confirmLoading={isLoading}
        >
            <Row style={{marginBottom: 10}}>
                <Col span={24}>
                    <Typography>Time interval</Typography>
                    <DatePicker.RangePicker
                        showTime={{format: 'HH:mm:ss'}}
                        format="YYYY-MM-DD HH:mm:ss"
                        {...getDefaultPickerValue()}
                        onChange={onChangeRangePicker}
                        disabled={type === "delete"}
                    />
                </Col>
            </Row>
            {isVisibleTimeTrackType &&
				<Row>
					<Col span={24}>
						<Typography>Type</Typography>
						<Select
							style={{width: 120}}
							onChange={(value: number) => setCurrentTimeTrackType(value)}
							defaultValue={getDefaultTypeSelectValue()}
							disabled={type === "delete"}
						>
                            {
                                timeTrackTypes?.map(
                                    (type: TimeTrackType) =>
                                        <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
                                )
                            }
						</Select>
					</Col>
				</Row>
            }
        </Modal>
    );
};

export default TimeTrackModal;
