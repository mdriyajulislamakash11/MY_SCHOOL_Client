import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return children;
    }



    return <Navigate to='/login'  state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;