const readCookies = () => {
    const AUTHORIZE_TOKEN = document.cookie
    .split("; ")
    .find((row) => row.startsWith("expensejar_token="))
    ?.split("=")[1];

    const REFRESH_TOKEN = document.cookie
    .split("; ")
    .find((row) => row.startsWith("expensejar_refresh_token="))
    ?.split("=")[1];

    return {
        authorizationToken: AUTHORIZE_TOKEN,
        refreshToken: REFRESH_TOKEN
    }
}

export default readCookies;