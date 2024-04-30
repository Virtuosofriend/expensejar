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
let isRefreshing = false;
let refreshQueue = [];

const errorInterceptor = async (error) => {
    const request = error?.config;

    // check if it's a server error
    if (!error.response) {
        return Promise.reject(error);
    }

    if (error.response) {
        if ( error?.response?.status === 403 ) {
            console.error(error.response)
            router.push({ name: routeNames.LOGIN });
        }
        /*
 Refresh token is expired.
 401 happens
 error message returns "token expired"
But the auth/refresh also returns an error "Invalid user creds"
 We need to handle it
*/
        if (error?.response?.status === 401 && !request?.sent) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const { refreshToken } = readCookies();
                    if (refreshToken) {
                        const { error } = await checkRefreshCookieValidity(refreshToken);
                        if (error) {
                            console.log(error)
                            return router.push({ name: routeNames.LOGIN });
                        }
                        return axiosInstance(request);
                    } else {
                        console.error("No refresh token found");
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                    refreshQueue.forEach((resolve) => resolve());
                    refreshQueue = [];
                }
            } else {
                return new Promise((resolve) => {
                    refreshQueue.push(() => {
                        const { authorizationToken } = readCookies();
                        request.headers.Authorization = `Bearer ${authorizationToken}`;
                        resolve(axiosInstance(request));
                    });
                });
            }
        }
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