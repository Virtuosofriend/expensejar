import { api } from "./api";

const URLS = {
    jars:    "items/jars",
};

export const fetchSpecificJar = jar => {
    return api.get(`${URLS.jars}/${jar.id}?fields=id,date_created,date_updated,user_created.id,jar_members.*.*`);
};