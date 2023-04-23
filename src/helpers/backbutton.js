import { App } from "@capacitor/app";

App.addListener("backButton", async () => {
    if ( window.location.pathname === "/home" ) {
        await App.exitApp();
        return
    }
    if ( window.location.pathname === "/login") {
        await App.exitApp();
        return
    }
    // router.go(-1);
    history.back();
});