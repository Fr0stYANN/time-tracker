import {Navigate} from "react-router-dom";
import {useAppSelector} from "hooks";
import {selectUser} from "store/selectors/userSelectors";
import {Path} from "utils/path";
import {selectLoading} from "../store/selectors/loadingSelectors";
import {useEffect, useState} from "react";
import FullPageLoader from "../components/FullPageLoader/FullPageLoader";

type Props = {
    children: JSX.Element
}

const RequireUnauthorized = ({children}: Props): JSX.Element | null => {
    const loaded = useAppSelector(selectLoading).isAuthLoaded;
    const user = useAppSelector(selectUser);

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (loaded && user) {
            setIsAuthorized(true);
        } else if (loaded && !user) {
            setIsAuthorized(false);
        }
    }, [loaded, user])

    if (isAuthorized === null) {
        return <FullPageLoader/>;
    }

    if (!isAuthorized) {
        return children;
    }

    return <Navigate to={Path.TIMETRACKS} replace />
}

export default RequireUnauthorized;
