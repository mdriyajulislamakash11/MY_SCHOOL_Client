import React from 'react';
import useRole from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { Navigate, replace, useLocation } from 'react-router-dom';

const StudentRoute = ({children}) => {
    const [role, isLoading] = useRole();
    const {user, loading} = useAuth();
    const location = useLocation();

    if(isLoading || loading){
        return <div>Loading...</div>;
    }

    if(user && role === 'student'){
        return children;
    }


    return <Navigate to="/" state={{ from: location }} replace={true} />;
};

export default StudentRoute;