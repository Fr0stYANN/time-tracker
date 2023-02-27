import { RootState } from '../index';
import OptionType from '../../types/optionType';

export const selectOptions = (state: RootState) => state.options;

export const selectOptionById = (optionId: number) => {
    return (state: RootState) => state.options.find((opt: OptionType) => opt.id === optionId);
}
