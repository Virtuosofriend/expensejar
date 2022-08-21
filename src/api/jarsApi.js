import { api } from "./api";

const URLS = {
    jars:    "items/jars",
};

export const fetchJars = () => {
    return api.get(`${URLS.jars}`);
};

export const fetchJars2 = () => {
    return api.get(`${URLS.jars}`);
};
