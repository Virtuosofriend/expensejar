const fetchUsersList = ({ commit }, payload) => {
    commit("saveUsersList", payload);
};

export default {
    fetchUsersList
};