import { App } from "@capacitor/app";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
App.addListener("backButton", () => {
    if ( route.path === "/home" ) {
        App.exitApp();
        return
    }
    if ( route.path === "/login") {
        App.exitApp();
        return
    }
    router.go(-1);
});