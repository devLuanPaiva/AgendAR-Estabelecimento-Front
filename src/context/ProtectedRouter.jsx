import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRouter = () => {
    const { authTokens } = useContext(AuthContext);
    const { access } = authTokens

    return access ? <Outlet /> : <Navigate to="/autenticacao" />
}

export default ProtectedRouter
