import { api, publicApi } from "./api";

const URLS = {
    auth:    "auth/",
};

export const loginUser = payload => {
    return api.post(`${URLS.auth}login`, payload);
};

export const refreshToken = payload => {
    return publicApi.post(`${URLS.auth}refresh`, payload);
};

export const logout = payload => {
    return api.post(`${URLS.auth}logout`, payload);
};