import { api, apiObject } from "./api";

const URLS = {
    auth:    "auth/",
};

export const loginUser = payload => {
    return api.post(`${URLS.auth}login`, payload);
};

export const refreshToken = payload => {
    return api.post(`${URLS.auth}refresh`, payload);
};