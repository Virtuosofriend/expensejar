import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify"
import "@/plugins/dayjs";
import HighchartsVue from "highcharts-vue";
import { firestorePlugin } from "vuefire";

Vue.use(HighchartsVue);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;
/**
* Globally register all `_base`-prefixed components
*/

import "./plugins/base.js";
import "./helpers/backbutton.js";

/**
* Globally register filters
*/
import OnlyMonth from "@/common/onlyMonthdate.filter.js";
import ShortMonthDay from "@/common/shortMonthDaydate.filter.js";

Vue.filter("onlyMonth", OnlyMonth);
Vue.filter("ShortMonthDay", ShortMonthDay);

new Vue({
    name: "ExpenseJar",
	router,
	store,
	vuetify,
    i18n,
	render: (h) => h(App),
}).$mount("#app");
