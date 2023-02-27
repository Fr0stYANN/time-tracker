import { ApproveRecordType, VacationType } from 'types/vacationTypes';

export type DisplaySentRequestType = {
    key: number
    vacationId?: number
    userId?: number
    vacation: VacationType
    startDate?: string | null
    endDate?: string | null
    comment?: string | null
    approveString?: string | null
    approveRecords?: ApproveRecordType[] | null
}

export type DisplayVacationToApproveType = {
    key: number
    vacationId?: number | null
    firstName?: string | null
    lastName?: string | null
    isApproved?: boolean | null
    startDate?: string | null
    endDate?: string | null
    comment?: string | null
}

export const displaySentRequestData = (sentRequests: VacationType[]) => {
    const displayData: DisplaySentRequestType[] = [];

    for (const sentRequest of sentRequests) {
        displayData.push({
            key: sentRequest.id,
            userId: sentRequest.user.id,
            vacationId: sentRequest.id,
            vacation: sentRequest,
            startDate: sentRequest.startDate,
            endDate: sentRequest.endDate,
            comment: sentRequest.comment,
            approveString: !sentRequest.approveRecords?.every(record => record === null) ?
                `${sentRequest.approveRecords?.filter(record => record.isApproved !== null).length}/${sentRequest.approveRecords?.length}`
                : 'No approvers',
            approveRecords: sentRequest.approveRecords
        });
    }

    return displayData;
}

export const displayVacationsToApproveData = (vacationsToApprove: VacationType[]) => {
    const displayData: DisplayVacationToApproveType[] = [];

    for (const vacationToApprove of vacationsToApprove) {
        displayData.push({
            key: vacationToApprove.approveRecords?.find(value => value !== null)?.id!,
            firstName: vacationToApprove.user.firstname,
            lastName: vacationToApprove.user.lastname,
            isApproved: vacationToApprove.isApproved,
            startDate: vacationToApprove.startDate,
            endDate: vacationToApprove.endDate,
            comment: vacationToApprove.comment
        });
    }

    return displayData;
}


export const getApproveRecordsContent = (record: DisplaySentRequestType): string[] => {
    let content: string[] = [];
    if (!record.approveRecords) return content;

    record.approveRecords.forEach(record => {
        let name: string = `${record.approver.firstname} ${record.approver.lastname}`;

        if (record.isApproved) {
            generateResponseStatus(record, `Is approved by ` + name, content);
        }
        if (!record.isApproved && record.isApproved !== null) {
            generateResponseStatus(record, `Is declined by ` + name , content);
        }
        if (record.isApproved === null) {
            let str: string = `Is not answered by ` + name;
            content.push(str);
        }
    })

    return content;
}

const generateResponseStatus = (record: ApproveRecordType, responseStatus: string, content: string[]) => {
    if (record.comment) {
        responseStatus = responseStatus.concat(` with comment: ${record.comment}`);
    }
    content.push(responseStatus);
}

export const generateStatusIcon = (record: DisplaySentRequestType) => {
    const {
        approveRecords,
        isApproved
    } = record.vacation;

    if (isApproved) 
        return "approved"

    if (approveRecords?.find(record => record.isApproved === null))
        return "pending"

    if (!isApproved && approveRecords?.find(record => record.isApproved !== null))
        return "declined"
}