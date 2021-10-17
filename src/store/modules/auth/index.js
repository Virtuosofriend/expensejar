import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
    userId: localStorage.getItem("expenseJar_uid") || null,
    homeId: localStorage.getItem("expenseJar_homeId") || null
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
