import {SickLeaveType} from "../types/sickLeaveTypes";

export type DisplaySickLeavesData = {
    key: string
    startDate: string
    endDate: string
}

const getDisplaySickLeavesData = (sickLeaves: SickLeaveType[]): DisplaySickLeavesData[] | undefined => {
    const displaySickLeaves = [];

    if (sickLeaves.length !== 0) {
        for (const sickLeave of sickLeaves) {
            displaySickLeaves.push({
                key: sickLeave.id.toString(),
                startDate: sickLeave.startDate,
                endDate: sickLeave.endDate
            })
        }
    }

    return displaySickLeaves.length == 0 ? undefined : displaySickLeaves;
}

export default getDisplaySickLeavesData;