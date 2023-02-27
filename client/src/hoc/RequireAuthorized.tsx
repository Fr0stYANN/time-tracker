import {Navigate} from "react-router-dom";
import {useAppSelector} from "hooks";
import {selectUser} from "store/selectors/userSelectors";
import {Path} from "utils/path";
import {selectLoading} from "../store/selectors/loadingSelectors";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import isHaveOption from "../store/selectors/isHaveOption";
import FullPageLoader from "../components/FullPageLoader/FullPageLoader";

type Props = {
    children: JSX.Element,
    optionCode?: string
}

const RequireAuthorized = ({children, optionCode}: Props): JSX.Element | null => {
    const loaded = useAppSelector(selectLoading).isAuthLoaded;
    const user = useAppSelector(selectUser);
    const isHaveOpt = useSelector(isHaveOption(optionCode ?? ''));

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (loaded && user) {
            if (optionCode) {
                if (isHaveOpt) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(true);
            }
        } else if (loaded && !user) {
            setIsAuthorized(false);
        }
    }, [loaded, user])

    if (isAuthorized === null) {
        return <FullPageLoader/>;
    }

    if (isAuthorized) {
        return children;
    }

    return <Navigate to={Path.LOGIN} replace/>
};

export default RequireAuthorized;
