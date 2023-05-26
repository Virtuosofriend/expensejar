import { apiObject } from "../api/api";
import { withAsync } from "./withAsync";
import { refreshToken } from "../api/authApi";
import { getMyUser } from "../api/usersApi";

import { useUserStore } from "@/stores/UserStore";
import { routeNames } from "@/common/constants/routeNames";
import router from "@/router";

export const setCookiesAuthetication = (token, expiry, refreshtoken) => {
    const expiration_time = expiry + 7 * 24 * 60 * 60 * 1000;

    // Expiry dates to comply with Directus for refresh
    // token expiration time
    let cookieExpiryDate = new Date();
    cookieExpiryDate.setTime(cookieExpiryDate.getTime() + expiration_time);

    let refreshExpiryDate = new Date();
    refreshExpiryDate.setTime(refreshExpiryDate.getTime() + expiration_time);

    document.cookie = `expensejar_token=${token}; expires=${cookieExpiryDate}`;
    document.cookie = `expensejar_refresh_token=${refreshtoken}; expires=${refreshExpiryDate}`;
    setHeaderInAxios(token);
    return fetchCurrentUserId();
};

export const removeCookiesAuthentication = () => {
    document.cookie = "expensejar_token=;expires=" + new Date(0).toUTCString();
    document.cookie = "expensejar_refresh_token=;expires=" + new Date(0).toUTCString();
};

// Refresh token is called two times, if two api are failing. We need to tackle this to enable the max expiry date of refresh token (now it is 365 days)
export default async function checkRefreshCookieValidity(token) {
    const payload = {
        "refresh_token": token,
        mode: "json"
    };

    const { response, error } = await withAsync(refreshToken, payload);
    if ( error ) {
        // if ( error.response.status === 401 ) {
        //     document.cookie = `expensejar_token=''; Max-Age=0`;
        //     document.cookie = `expensejar_refresh_token=''; Max-Age=0`;
        //     router.push({ name: routeNames.LOGIN });
        // }
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