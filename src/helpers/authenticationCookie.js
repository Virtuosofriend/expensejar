import { apiObject } from "../api/api";
import { withAsync } from "./withAsync";
import { refreshToken } from "../api/authApi";
import { getMyUser } from "../api/usersApi";

import { useUserStore } from "@/stores/UserStore";


export const setCookiesAuthetication = (token, expiry, refreshtoken) => {
    // Set expiry dates to comply with Directus
    let cookieExpiryDate = new Date();
    cookieExpiryDate.setTime(cookieExpiryDate.getTime() + expiry);

    let refreshExpiryDate = new Date();
    refreshExpiryDate.setTime(refreshExpiryDate.getTime() + expiry + 7 * 24 * 60 * 60 * 1000); // 7 days ahead

    document.cookie = `expensejar_token=${token}; expires=${cookieExpiryDate}`;
    document.cookie = `expensejar_refresh_token=${refreshtoken}; expires=${refreshExpiryDate}`;
    setHeaderInAxios(token);
    return fetchCurrentUserId();
};

export default async function checkRefreshCookieValidity(token) {
    const payload = {
        refresh_token: token,
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