import { useUserStore } from "@/stores/UserStore";

import { withAsync } from "./withAsync";

import { apiObject } from "../api/api";
import { refreshToken } from "../api/authApi";
import { getMyUser } from "../api/usersApi";

export const setCookiesAuthetication = (session_token, refresh_token) => {
    document.cookie = `expensejar_token=${session_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;`;
    document.cookie = `expensejar_refresh_token=${refresh_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT path=/;`;
    setHeaderInAxios(session_token);
    return fetchCurrentUserId();
};

export const removeCookiesAuthentication = () => {
    document.cookie = "expensejar_token=;expires=" + new Date(0).toUTCString();
    document.cookie = "expensejar_refresh_token=;expires=" + new Date(0).toUTCString();
};

export default async function checkRefreshCookieValidity(token) {
    const payload = {
        refresh_token: token,
        mode: "json"
    };

    const { response, error } = await withAsync(refreshToken, payload);
    if ( error ) {
        return error.error;
    }
    const { access_token, refresh_token } = response.data.data;
    setCookiesAuthetication(access_token, refresh_token);
    return true;
}

function setHeaderInAxios(token) {
    return apiObject.defaults.headers["Authorization"] = `Bearer ${ token }`;
}

async function fetchCurrentUserId() {
    const userStore = useUserStore();
    const { response, error } = await withAsync(getMyUser);

    if ( error ) {
        return;
    }
    localStorage.setItem("expensejar-profile", JSON.stringify(response.data.data));
    return userStore.setUserProfile(response.data.data);
}