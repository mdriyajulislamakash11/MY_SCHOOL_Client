import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
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
            await logOut()
            navigate('/signIn')
        }
        // console.log("status error INTERCEPTOR", status)
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;