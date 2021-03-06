import axios from "axios"

// ***
// * General configuration for Axios instance
// * Like locale && authorization header
// ***

const AUTHORIZE = `TOKEN`

const HEADERS = {
	"Content-Type": "application/json",
	Accept: "application/json",
}

if (AUTHORIZE != null) {
	HEADERS["Authorization"] = AUTHORIZE
}

const axiosParams = {
	baseURL: "https://api.draxis.gr/",
	headers: HEADERS,
}

// Axios instance
const axiosInstance = axios.create(axiosParams)

// Error handling
const errorInterceptor = (error) => {
	// check if it's a server error
	if (!error.response) {
		return Promise.reject(error)
	}

	// all the error responses
	switch (error.response.status) {
		case 401: // authentication error, logout the user
			break

		default:
			""
	}
	return Promise.reject(error)
}

// Success responses
const responseInterceptor = (response) => {
	return response
}

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)

// Main api function
const apiMethods = (axios) => {
	const logger = async (promise) =>
		promise.catch((error) => {
			if (process.env.NODE_ENV !== "development") throw error

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
