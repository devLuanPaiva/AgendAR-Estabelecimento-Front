import useAxios from './useAxios';
import { useQuery } from 'react-query';

const useFetch = (url) => {
    const api = useAxios()
    const { data, isLoading, error, refetch } = useQuery("data", () => {
        return api
            .get(url)
            .then().then((response) => response.data)
    }, {
        retry: 2,
    })

    
    return { data, error, isLoading, refetch };
};

export default useFetch;
