import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../context/api';

const useAxios = () => {
  const { getAuthTokens, refreshAuthToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const tokens = getAuthTokens();
        if (tokens && tokens.access) {
          config.headers.Authorization = `Bearer ${tokens.access}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const tokens = await refreshAuthToken();
          if (tokens) {
            originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
            return api(originalRequest);
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getAuthTokens, refreshAuthToken, logout]);

  return api;
};

export default useAxios;
