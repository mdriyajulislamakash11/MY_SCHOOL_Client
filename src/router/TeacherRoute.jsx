import React from 'react';
import useRole from '../hook/useRole';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const TeacherRoute = ({children}) => {
    const [role, isLoading] = useRole();
    const {user, loading} = useAuth();
    const location = useLocation();

    if(isLoading || loading){
        return <div>Loading...</div>;
    }

    if(role === 'teacher' && user){
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default TeacherRoute;