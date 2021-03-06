import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import general from "./modules/general";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        general
    },
});
