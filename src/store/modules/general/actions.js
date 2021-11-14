const fetchUsersList = ({ commit }, payload) => {
    commit("saveUsersList", payload);
};

const fetchAllHomes = ({ commit }, payload) => {
    commit("saveAllHomes", payload);
};

export default {
    fetchUsersList,
    fetchAllHomes
};