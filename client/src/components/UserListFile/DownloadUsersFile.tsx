import DownloadUsersExcelModal from "../ModalWindow/DownloadUsersListModal";
import {Moment} from "moment";
import {useState} from "react";
import {useActions, useAppSelector} from "hooks";
import {selectUserParameters} from "store/selectors/usersParametersSelctor";
import moment from "moment";

type PropertyType = {
    modalVisible: boolean;
    setModalVisible: Function;
}
const dateFormat = 'YYYY-MM-DD';
type RangeValue = [Moment | null, Moment | null];

const DownloadUsersFile = ({modalVisible, setModalVisible}: PropertyType) => {
    const { getUserListFileApiRequest } = useActions();
    const userParameters = useAppSelector(selectUserParameters);
    const [rangeDay, setRangeDay] = useState<RangeValue>([null, moment()]);
    const [fileType, setFileType] = useState<string>('EXCEL');

    const onDownloadUsersExcel = () => {
        getUserListFileApiRequest({
            startDate: rangeDay[0]!.format(dateFormat),
            endDate: rangeDay[1]!.format(dateFormat),
            filters: userParameters.filters,
            sort: userParameters.sort,
            search: userParameters.search,
            fileType: fileType
        })
        setModalVisible(false);
    }

    return(
        <>
            <DownloadUsersExcelModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                range={rangeDay}
                setRange={setRangeDay}
                setFileType={setFileType}
                onDownloadUsersExcel={onDownloadUsersExcel}
            />
        </>
    )
}

export default DownloadUsersFile;
