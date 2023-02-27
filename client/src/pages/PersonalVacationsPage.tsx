import React, { useEffect, useState } from 'react';
import SentRequest from 'components/Vacations/SentRequests/SentRequest';
import VacationsToApprove from 'components/Vacations/Request/VacationsToApprove';
import { Button, Tabs, Tag } from 'antd';
import { useActions, useAppSelector } from 'hooks';
import { selectUser } from 'store/selectors/userSelectors';
import RequestVacationModal from 'components/Vacations/RequestVacationForm/RequestVacationModal';
import { CreateVacationFormType, RequestVacationType } from 'types/vacationTypes';
import { selectRequestedVacations, selectVacationsToApprove } from 'store/selectors/vacationSelector';
import { displaySentRequestData, DisplaySentRequestType, displayVacationsToApproveData, DisplayVacationToApproveType } from 'utils/vacationsDisplayData';

const dateFormat = 'YYYY-MM-DD';

const PersonalVacationsPage = (): JSX.Element => {
    const { TabPane } = Tabs;

    const user = useAppSelector(selectUser);

    const requests = useAppSelector(selectRequestedVacations);
    const vacationsToApprove = useAppSelector(selectVacationsToApprove);

    const { clearVacationState, createVacationApiRequest, getVacationsToApproveApiRequest, getRequestedVacationApiRequest } = useActions();

    const [sentRequestsDisplayData, setSentRequestsDisplayData] = useState<DisplaySentRequestType[] | undefined>(undefined);
    const [requestModalVisibility, setRequestModalVisibility] = useState<boolean>(false);
    const [displayVacationsToApprove, setDisplayVacationsToApprove] = useState<DisplayVacationToApproveType[] | undefined>(undefined);

    const setModalVisibility = (visibility: boolean) => {
        setRequestModalVisibility(visibility);
    }

    useEffect(() => {
        setSentRequestsDisplayData(displaySentRequestData(requests));
    }, [requests])

    useEffect(() => {
        setDisplayVacationsToApprove(displayVacationsToApproveData(vacationsToApprove!));
    }, [vacationsToApprove])


    useEffect(() => {
        getRequestedVacationApiRequest(user?.id!);
        getVacationsToApproveApiRequest(user?.id!);
        return () => {
            clearVacationState();
        }
    }, [user])

    const onSubmit = (values: CreateVacationFormType): void => {
        let createVacation: RequestVacationType = {
            userId: values.userId,
            startDate: values.rangeDate && values.rangeDate[0]?.format(dateFormat),
            endDate: values.rangeDate && values.rangeDate[1]?.format(dateFormat),
            comment: values.comment
        };
        setModalVisibility(false);
        createVacationApiRequest(createVacation);
        getRequestedVacationApiRequest(user?.id!);
    }

    return (
        <div>
            <Tabs>
                <TabPane
                    tab="Your vacations"
                    key="1">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button type="primary" onClick={() => setModalVisibility(true)}>Request Vacation</Button>
                            <p style={{color: 'black', fontSize: '14px', fontWeight: '400'}}>Available days of vacation <Tag style={{fontSize: '14px', padding: '6px 10px'}} >{user?.vacationDays}</Tag></p>
                        </div>
                            <RequestVacationModal
                                isVisible={requestModalVisibility}
                                userId={user?.id!}
                                setModalVisibility={setModalVisibility}
                                buttonText="request"
                                onSubmit={onSubmit}
                                vacationDays={user?.vacationDays}
                            />
                        <div style={{marginTop: '20px'}}>
                            <SentRequest
                                userId={user?.id!}
                                requests={sentRequestsDisplayData!}
                            />
                        </div>
                </TabPane>
                <TabPane
                    tab="Approve Vacations"
                    key="2"
                >
                    <VacationsToApprove
                        userId={user?.id!}
                        vacationsToApprove={displayVacationsToApprove!}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default PersonalVacationsPage;
