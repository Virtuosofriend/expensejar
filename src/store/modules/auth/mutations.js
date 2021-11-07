const  setHomeId = (state, data) => {
    state.homeId = data;
};

const setUserId = (state, data) => state.userId = data;

const  clearSession = state => {
    state.homeId = null;
    state.userId = null;
};

export default {
    setHomeId,
    setUserId,
    clearSession
};
