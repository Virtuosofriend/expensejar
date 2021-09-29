import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { auth } from "./api/firebase"
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify"

Vue.config.productionTip = false

/**
* Globally register all `_base`-prefixed components
*/

import "./plugins/base.js"


new Vue({
	router,
	store,
	vuetify,
    i18n,
	render: (h) => h(App),
}).$mount("#app")
