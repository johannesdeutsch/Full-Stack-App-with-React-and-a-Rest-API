import React from 'react';
import { Navigate } from 'react-router-dom';

const UserSignOut = () => {
    return (
        <Navigate to="/" replace={true} />
    );
}

export default UserSignOut;