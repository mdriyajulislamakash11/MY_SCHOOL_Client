import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../hook/useRole';
import useAuth from '../hook/useAuth';

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();
    const {user, loading} = useAuth();

    if (isLoading || loading) {
        return <div>Loading...</div>;
    }

    if (role === "admin" && user) {
        return children;
    }

    return <Navigate to="/login" replace={true} />;
};

export default AdminRoute;