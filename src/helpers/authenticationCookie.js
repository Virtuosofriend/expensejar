import { apiObject } from "../api/api";
import { withAsync } from "./withAsync";
import { refreshToken } from "../api/authApi";
import { getMyUser } from "../api/usersApi";

import { useUserStore } from "@/stores/UserStore";

export const setCookiesAuthetication = (session_token, expireTimeInMs, refresh_token) => {
    const refresh_token_expiryTime = expireTimeInMs + 7 * 24 * 60 * 60 * 1000;

    // Expiry dates to comply with Directus for refresh
    // token expiration time
    let cookieExpiryDate = new Date();
    cookieExpiryDate.setTime(cookieExpiryDate.getTime() + expireTimeInMs);

    let refreshExpiryDate = new Date();
    refreshExpiryDate.setTime(refreshExpiryDate.getTime() + refresh_token_expiryTime);

    document.cookie = `expensejar_token=${session_token}; expires=${cookieExpiryDate}`;
    document.cookie = `expensejar_refresh_token=${refresh_token}; expires=${refreshExpiryDate}`;
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
        return
    }
    const { access_token, expires, refresh_token } = response.data.data;
    return setCookiesAuthetication(access_token, expires, refresh_token);
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