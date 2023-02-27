import OptionType from "types/optionType";

export type CheckBoxItem = {
    label: string,
    value: number | string
}

const getCheckBoxItems = (options: OptionType[]): CheckBoxItem[] => {
    const checkBoxItems: CheckBoxItem[] = [];

    for (const opt of options) {
        checkBoxItems.push({
            label: opt.name,
            value: opt.id
        })
    }

    return checkBoxItems;
}

export default getCheckBoxItems;
