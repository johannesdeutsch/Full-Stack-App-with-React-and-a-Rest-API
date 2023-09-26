import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//this component protects the create new course route as well as the update course route and stores the location when trying to create a new course
const PrivateRoute = () => {
    const {authUser} = useContext(UserContext);
    const location = useLocation();
    

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/" state={{from: location.pathname}}/>
    }
}

export default PrivateRoute;