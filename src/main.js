import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import vuetify from "./plugins/vuetify";


// Additional settings
import i18n from "./plugins/i18n";
import dayjs from "@/plugins/dayjs";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);

app.config.globalProperties.$date = dayjs;

app.mount("#app");
