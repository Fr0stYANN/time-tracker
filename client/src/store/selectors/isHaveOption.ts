import { RootState } from '../index';
import OptionType from '../../types/optionType';

const isHaveOption = (optionCode: string) => {
    return (state: RootState) => state.user?.options?.filter((opt: OptionType) => opt.code === optionCode);
}

export default isHaveOption;
