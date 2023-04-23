import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Capacitor configuration
import "@/helpers/backbutton";

// Vuetify
import vuetify from "./plugins/vuetify";
import "./styles/variables.scss";

// Additional settings
import i18n from "./plugins/i18n";
import dayjs from "@/plugins/dayjs";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

app.provide("date", dayjs);
app.mount("#app");
