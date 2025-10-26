import axios from "axios";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'https://assignment12-server-omega.vercel.app'
})

const useAxiosSecure = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    // send token in server site
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')

        // console.log('REQUEST INTERRUPTED BY INTERCEPTOR')
        config.headers.authentication = `bearer ${token}`

        return config

    }, function (error) {
        return Promise.reject(error)
    })
    // get response
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async function (error) {
        // here some option
        const status = error?.response?.status
        // console.log(status)
        
        if (status === 401 || status === 403) {
            await logout()
            navigate('/signIn')
        }
        // console.log("status error INTERCEPTOR", status)
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;