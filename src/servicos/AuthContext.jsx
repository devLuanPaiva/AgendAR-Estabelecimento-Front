import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [authTokens, setAuthTokens] = useState({
        access: localStorage.getItem('access_token') || null,
        refresh: localStorage.getItem('refresh_token') || null,
    });

    const updateTokens = (access, refresh) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setAuthTokens({ access, refresh });
    };
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuthTokens({ access: null, refresh: null });
    };
    return (
        <AuthContext.Provider value={{ authTokens, updateTokens, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
