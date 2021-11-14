const saveUsersList = (state, data) => state.users = data;
const saveAllHomes = (state, homes) => state.homes = homes;

export default {
    saveUsersList,
    saveAllHomes
};
