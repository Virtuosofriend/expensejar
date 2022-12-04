import { api } from "./api";

const URLS = {
    users:    "users/",
};

export const getMyUser = () => {
    return api.get(`${URLS.users}me?fields=*`);
};

export const getSpecificUser = userId => {
    return api.get(`${URLS.users}${userId}`);
};