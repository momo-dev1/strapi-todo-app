import { AxiosRequestConfig } from "axios";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";

interface IAuthenticatedQuery {
    queryKey: string[],
    url: string,
    config?: AxiosRequestConfig
}

const useAuthenticatedQuery = ({ queryKey, url, config }: IAuthenticatedQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance.get(url, config)
            return data
        },
    });
}

export default useAuthenticatedQuery