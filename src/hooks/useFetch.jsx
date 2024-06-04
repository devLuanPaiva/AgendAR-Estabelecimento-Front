import useAxios from './useAxios';
import { useQuery } from 'react-query';

const useFetch = (url) => {
    const api = useAxios()
    const { data, isLoading, error, refetch } = useQuery(["data", url], async () => {
        const response = await api
            .get(url);
        return response.data;
    }, {
        retry: 2,
    });

    return { data, error, isLoading, refetch };
};

export default useFetch;