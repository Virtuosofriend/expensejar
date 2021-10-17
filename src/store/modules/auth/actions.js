const setHome = ({ commit }, payload) => {
    localStorage.setItem("expenseJar_homeId", payload);
    commit("setHomeId", payload);
};

export default {
    setHome
};