import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    
    const [authTokens, setAuthTokens] = useState({
        access: sessionStorage.getItem('access_token') || null,
        refresh: sessionStorage.getItem('refresh_token') || null,
        estabelecimento: JSON.parse(sessionStorage.getItem('estabelecimento')) || null,
    });

    const updateTokens = (access, refresh, estabelecimento) => {
        sessionStorage.setItem('access_token', access);
        sessionStorage.setItem('refresh_token', refresh);
        sessionStorage.setItem('estabelecimento', JSON.stringify(estabelecimento)); 
        setAuthTokens({ access, refresh, estabelecimento });
        
    };
    const logout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('estabelecimento');
        setAuthTokens({ access: null, refresh: null, estabelecimento: null });

    };
    return (
        <AuthContext.Provider value={{ authTokens, updateTokens, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
