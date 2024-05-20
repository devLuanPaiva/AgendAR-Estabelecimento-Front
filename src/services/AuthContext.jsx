import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => ({
        access: sessionStorage.getItem('access_token') || null,
        refresh: sessionStorage.getItem('refresh_token') || null,
        estabelecimento: JSON.parse(sessionStorage.getItem('estabelecimento')) || null,
    }));

    const getAuthTokens = () => ({
        access: sessionStorage.getItem('access_token'),
        refresh: sessionStorage.getItem('refresh_token'),
        estabelecimento: JSON.parse(sessionStorage.getItem('estabelecimento')),
    });

    const updateTokens = (access, refresh, estabelecimento) => {
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);
        sessionStorage.setItem('estabelecimento', JSON.stringify(estabelecimento));
        setAuthTokens({ access, refresh, estabelecimento });
    };

    const refreshAuthToken = async () => {
        const tokens = getAuthTokens();
        if (tokens && tokens.refresh) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: tokens.refresh,
                });
                const newTokens = response.data;
                updateTokens(newTokens.access, tokens.refresh, tokens.estabelecimento);
                return newTokens;
            } catch (error) {
                console.error('Error refreshing token:', error);
                logout();
            }
        }
        return null;
    };

    const logout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('estabelecimento');
        setAuthTokens({ access: null, refresh: null, estabelecimento: null });
    };

    return (
        <AuthContext.Provider value={{ authTokens, updateTokens, getAuthTokens, refreshAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
