import axios from "axios";
import checkRefreshCookieValidity from "@/helpers/authenticationCookie";
import readCookies from "@/helpers/readCookies";
import { routeNames } from "@/common/constants/routeNames";
import router from "@/router";
// ***
// * General configuration for Axios instance
// ***

const HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const axiosParams = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: HEADERS,
};

// Axios instance
const axiosInstance = axios.create(axiosParams);
const axiosPublic = axios.create(axiosParams);

// Request interceptor for the private instance
axiosInstance.interceptors.request.use(
    async (config) => {
        const { authorizationToken: AUTHORIZE_TOKEN } = readCookies();

        if ( AUTHORIZE_TOKEN ) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${AUTHORIZE_TOKEN}`,
            };
        }
    
        return config;
    },
    (error) => Promise.reject(error)
);

// Error handling
const errorInterceptor = async (error) => {
    const config = error?.config;

    // check if it's a server error
    if (!error.response) {
        return Promise.reject(error);
    }

    if (error.response) {
        if ( error?.response?.status === 403 ) {
            router.push({ name: routeNames.LOGIN });
        }

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const { refreshToken } = readCookies();
            await checkRefreshCookieValidity(refreshToken);
        }

        return axiosInstance(config);
    }

    return Promise.reject(error);
}

// Success responses
const responseInterceptor = (response) => {
    return response;
}

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

// Main api function
const apiMethods = (axios) => {
    const logger = async (promise) =>
        promise.catch((error) => {
            if (import.meta.env.NODE_ENV !== "development") throw error

            if (error.response) {
                // Any errors
                console.log(error.response)
            } else if (error.request) {
                // No response at all
                console.log(error.request)
            } else {
                // Something else happened that triggered an error
                console.error("Error", error.message)
            }

            console.log(error.config)
            throw error
        })

    return {
        get: (url, config) => logger(axios.get(url, config)),
        post: (url, body, config) => logger(axios.post(url, body, config)),
        put: (url, body, config) => logger(axios.put(url, body, config)),
        patch: (url, body, config) => logger(axios.patch(url, body, config)),
        delete: (url, config) => logger(axios.delete(url, config)),
    }
}

export const api = apiMethods(axiosInstance);
export const apiObject = axiosInstance;
export const publicApi = apiMethods(axiosPublic);