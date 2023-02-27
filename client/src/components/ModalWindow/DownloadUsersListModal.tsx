import {DatePicker, Form, Modal, Select} from "antd";
import locale from "antd/es/date-picker/locale/en_GB";
import {Moment} from "moment";
const {RangePicker} = DatePicker;

type RangeValue = [Moment | null, Moment | null];
type PropertyType = {
    modalVisible: boolean;
    setModalVisible: Function;
    range: RangeValue;
    setRange: Function;
    setFileType: Function;
    onDownloadUsersExcel: Function;
}

const DownloadUsersListModal = ({modalVisible, setModalVisible, range, setRange, setFileType, onDownloadUsersExcel}: PropertyType) => {
    return(
        <>
            <Modal
                visible={modalVisible}
                onOk={()=>onDownloadUsersExcel()}
                onCancel={()=>setModalVisible(false)}
                style={{width: '100%'}}
            >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Form>
                        <Form.Item
                            label="Date range"
                            rules={[{
                                required: true, type: 'string',
                                validateTrigger: 'onBlur', message: 'date range is required'
                            }]}
                        >
                            <RangePicker
                                value={range}
                                onChange={(value) => setRange(value)}
                                locale={locale}
                                picker={"date"}
                            />
                        </Form.Item>
                        <Form.Item
                            initialValue={"EXCEL"}
                            name="fileType"
                            label="File type"
                            rules={[{
                                required: true, type: 'string',
                                validateTrigger: 'onBlur', message: 'file type is required'
                            }]}
                        >
                            <Select
                                onChange={(value) => setFileType(value)}
                            >
                                <Select.Option value='PDF'>PDF</Select.Option>
                                <Select.Option value='EXCEL'>EXCEL</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default DownloadUsersListModal;