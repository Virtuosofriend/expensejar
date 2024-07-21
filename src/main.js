import { createApp } from "vue";
import { createPinia } from "pinia";

import addBaseComponents from "./plugins/base";
import dayjs from "./plugins/dayjs";
import i18n from "./plugins/i18n";
// Vuetify
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

// Capacitor configuration
import "@/helpers/backbutton";

import "./styles/variables.scss";

const app = createApp(App);
const pinia = createPinia();
addBaseComponents(app);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

app.provide("date", dayjs);
app.mount("#app");
