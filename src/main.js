import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify"
import "@/plugins/dayjs";

Vue.config.productionTip = false

/**
* Globally register all `_base`-prefixed components
*/

import "./plugins/base.js"

/**
* Globally register filters
*/
import OnlyMonth from "@/common/onlyMonthdate.filter.js"

Vue.filter("onlyMonth", OnlyMonth);

new Vue({
	router,
	store,
	vuetify,
    i18n,
	render: (h) => h(App),
}).$mount("#app")
