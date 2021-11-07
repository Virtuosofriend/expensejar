const setHome = ({ commit }, payload) => {
    localStorage.setItem("expenseJar_homeId", payload);
    commit("setHomeId", payload);
};

const setUser = ({ commit }, payload) => {
    localStorage.setItem("expenseJar_uid", payload);
    commit("setUserId", payload);
};

const logoutUser = ({ commit }) => {
    localStorage.removeItem("expenseJar_homeId");
    localStorage.removeItem("expenseJar_uid");
    commit("clearSession");
};

export default {
    setHome,
    setUser,
    logoutUser
};