import {Routes, Route, Navigate} from 'react-router-dom';
import {RequireUnauthorized, RequireAuthorized} from 'hoc';
import {Content} from "components";
import {Option} from "utils/option";
import {Path} from 'utils/path';
import {
    Login,
    Users,
    CalendarPage,
    AddUser,
    EditUser,
    PersonalTimeTracksPage,
    Vacations,
    PersonalVacationsPage,
    TimeTracksPage,
    PersonalSickLeavePage,
    SickLeavePage
} from "pages";
import WorkChartPage from "../pages/WorkChartPage";


const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route element={<RequireUnauthorized><Content/></RequireUnauthorized>}>
                <Route path={Path.LOGIN} element={<Login/>}/>
            </Route>

            <Route element={<RequireAuthorized><Content/></RequireAuthorized>}>
                <Route index element={<PersonalTimeTracksPage/>}/>
                <Route path={Path.TIMETRACKS} element={<PersonalTimeTracksPage/>}/>
                <Route path={Path.CALENDAR} element={<CalendarPage/>}/>
                <Route path={Path.SICK_LEAVES} element={<PersonalSickLeavePage/>}/>
                <Route path={Path.VACATIONS} element={<PersonalVacationsPage/>}/>
            </Route>

            <Route element={<RequireAuthorized optionCode={Option.UserManagement}><Content/></RequireAuthorized>}>
                <Route path={Path.USERS} element={<Users/>}/>
                <Route path={Path.USER_ADD} element={<AddUser/>}/>
                <Route path={Path.USER_EDIT + '/:id'} element={<EditUser/>}/>
            </Route>

            <Route element={<RequireAuthorized optionCode={Option.WorkTimeManagement}><Content/></RequireAuthorized>}>
                <Route path={Path.TIMETRACKS + '/:id'} element={<TimeTracksPage/>}/>
                <Route path={Path.SICK_LEAVES + '/:id'} element={<SickLeavePage/>}/>
                <Route path={Path.VACATIONS + '/:id'} element={<Vacations/>}/>
                <Route path={Path.WORK_CHART + '/:id'} element={<WorkChartPage />} />
            </Route>

            <Route path="*" element={<Navigate to={Path.TIMETRACKS} replace/>}/>
        </Routes>
    );
};

export default AppRouter;
