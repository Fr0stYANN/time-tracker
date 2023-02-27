import React, {useEffect, useState} from 'react';
import {Spin} from "antd";

import './PartTimeTracker.css';
import moment, {Moment} from "moment";
import {TimeTrack} from "types/timeTracksTypes";
import {apiRequest} from "api/common/apiRequest";
import {getUnfinishedTimeTracksByUserId} from "api/queries/timeTracksQueries";
import {useActions, useAppSelector} from "hooks";
import {selectUser} from "store/selectors/userSelectors";
import {startTimeTrackMutation, stopTimeTrackMutation} from "api/mutations/timeTracksMutation";

const PartTimeTracker = (): JSX.Element => {
    const user = useAppSelector(selectUser)!;
    const {setNotification, addTimeTrack} = useActions();

    const [timerValue, setTimerValue] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [unfinishedTimeTrack, setUnfinishedTimeTrack] = useState<TimeTrack | null>(null);

    useEffect(() => {
        setIsLoading(true);
        apiRequest(getUnfinishedTimeTracksByUserId(user.id))
            .then(json => {
                setUnfinishedTimeTrack(json.data.timeTrack.getUnfinishedTimeTrackByUserId as TimeTrack);
            })
            .catch(error => {
                setNotification({
                    message: "Error",
                    description: error,
                    type: "error"
                });
                setUnfinishedTimeTrack(null);
                setTimerValue(undefined);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        let timerInterval: number;
        let timerMoment: Moment;

        if (unfinishedTimeTrack !== null) {
            timerMoment = moment(moment().utc().diff(moment.utc(unfinishedTimeTrack.startDate).local())).utc();
            timerInterval = window.setInterval(() => {
                timerMoment.add(1, 'second');
                setTimerValue(timerMoment.format("HH:mm:ss"));
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        }
    }, [unfinishedTimeTrack]);

    useEffect(() => {
        if (timerValue !== undefined) {
            document.title = `Time tracker (${timerValue})`;
        } else {
            document.title = "Time tracker"
        }

        return () => {
            document.title = "Time tracker"
        }
    }, [timerValue])

    const buttonClass = `tracker__button ${unfinishedTimeTrack !== null ? "tracker__button--active" : ""}`

    const onClickButton = () => {
        setIsLoading(true);

        if (unfinishedTimeTrack === null) {
            apiRequest(startTimeTrackMutation(user.id))
                .then(json => {
                    setUnfinishedTimeTrack(json.data.timeTrack.start as TimeTrack);
                })
                .catch(error => {
                    setNotification({
                        message: "Error",
                        description: error,
                        type: "error"
                    });
                    setUnfinishedTimeTrack(null);

                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            apiRequest(stopTimeTrackMutation(unfinishedTimeTrack.id))
                .then(json => {
                    addTimeTrack(json.data.timeTrack.stop as TimeTrack);
                    setUnfinishedTimeTrack(null);
                })
                .catch(error => {
                    setNotification({
                        message: "Error",
                        description: error,
                        type: "error"
                    });
                    setUnfinishedTimeTrack(null)
                })
                .finally(() => {
                    setIsLoading(false);
                    setTimerValue(undefined);
                });
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div className={buttonClass} onClick={onClickButton}>
                {
                    unfinishedTimeTrack === null
                        ? "Start time track"
                        :
                        <>
                            <span className="tracker__timer">{timerValue}</span>
                            Stop
                        </>
                }
            </div>
        </Spin>
    );
};

export default PartTimeTracker;
