import { App } from "@capacitor/app";
import router from "../router";

App.addListener("backButton", () => {
    console.log("logged")
    if ( router.currentRoute.path === "/home" ) {
        App.exitApp();
        return
    }
    if ( router.currentRoute.path === "/login") {
        App.exitApp();
        return
    }
    router.go(-1);
});