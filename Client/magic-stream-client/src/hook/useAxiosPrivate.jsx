import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const useAxiosPrivate = () => {
    const axiosAuth = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
    })

    return axiosAuth;
}

export default useAxiosPrivate;
