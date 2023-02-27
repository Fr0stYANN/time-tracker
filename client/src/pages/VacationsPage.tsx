import { Tag } from 'antd';
import { apiRequest } from 'api/common/apiRequest';
import { getUserByIdQuery } from 'api/queries/usersQueries';
import SentRequest from 'components/Vacations/SentRequests/SentRequest';
import { useActions, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectRequestedVacations, selectVacationsToApprove } from 'store/selectors/vacationSelector';
import { User } from 'types/userTypes';
import { displaySentRequestData, DisplaySentRequestType, displayVacationsToApproveData } from 'utils/vacationsDisplayData';
import UserNameContainer from "../components/Stuff/UserNameContainer";

const VacationsPage = () => {

    const params = useParams();
    const userId = parseInt(params.id!);

    const { clearVacationState, getRequestedVacationApiRequest, setNotification } = useActions();

    const requests = useAppSelector(selectRequestedVacations);

    const [user, setUser] = useState<User>();
    const [sentRequestsDisplayData, setSentRequestsDisplayData] = useState<DisplaySentRequestType[] | undefined>(undefined);

    useEffect(() => {
        apiRequest(getUserByIdQuery(userId, undefined))
            .then(json => {
                setUser(json.data.user.getById as User);
            })
            .catch(error => setNotification({
                message: 'An error occured',
                description: error,
                type: 'error'
            }))

        return () => {
            clearVacationState();
        }
    }, [])

    useEffect(() => {
        setSentRequestsDisplayData(displaySentRequestData(requests));
    }, [requests])

    useEffect(() => {
        if (user?.id)
            getRequestedVacationApiRequest(user?.id!);
    }, [user])

    return (
        <div>
            <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <UserNameContainer
                    firstname={user?.firstname}
                    lastname={user?.lastname}
                    email={user?.email}
                />
                <p
                    style={{ color: 'black', fontSize: '14px', fontWeight: '400' }}
                >
                    Available days of vacation
                    <Tag
                        style={{ fontSize: '14px', padding: '6px 10px', marginLeft: '5px' }}
                    >
                        {user?.vacationDays}
                    </Tag>
                </p>
            </div>
            <div style={{ marginTop: '20px' }}>
                <SentRequest
                    userId={userId}
                    requests={sentRequestsDisplayData!}
                />
            </div>
        </div>
    );
};

export default VacationsPage;
