import { apiObject } from "../api/api";
import { withAsync } from "./withAsync";
import { refreshToken } from "../api/authApi";
import { getMyUser } from "../api/usersApi";

import { useUserStore } from "@/stores/UserStore";

export const setCookiesAuthetication = (session_token, expireTimeInMs, refresh_token) => {
    const now = new Date();

    // Expiry dates to comply with Directus for refresh
    // token expiration time
    const sessionExpiryTime = new Date(now.getTime() + expireTimeInMs * 15);
    const refreshExpiryTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    document.cookie = `expensejar_token=${session_token}; expires=${sessionExpiryTime}; path=/;`;
    document.cookie = `expensejar_refresh_token=${refresh_token}; expires=${refreshExpiryTime} path=/;`;
    setHeaderInAxios(session_token);
    return fetchCurrentUserId();
};

export const removeCookiesAuthentication = () => {
    document.cookie = "expensejar_token=;expires=" + new Date(0).toUTCString();
    document.cookie = "expensejar_refresh_token=;expires=" + new Date(0).toUTCString();
};

export default async function checkRefreshCookieValidity(token) {
    const payload = {
        "refresh_token": token,
        mode: "json"
    };

    const { response, error } = await withAsync(refreshToken, payload);
    if ( error ) {
        return error.error;
    }
    const { access_token, expires, refresh_token } = response.data.data;
    setCookiesAuthetication(access_token, expires, refresh_token);
    return true;
}

function setHeaderInAxios(token) {
    return apiObject.defaults.headers["Authorization"] = `Bearer ${ token }`;
}

async function fetchCurrentUserId() {
    const userStore = useUserStore();
    const { response, error } = await withAsync(getMyUser);

    if ( error ) {
        return
    }
    localStorage.setItem("expensejar-profile", JSON.stringify(response.data.data));
    return userStore.setUserProfile(response.data.data);
}