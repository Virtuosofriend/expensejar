import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "UserStore",

    state: () => ({
        profile: JSON.parse(localStorage.getItem("expensejar-profile")) || {},
        homeId: localStorage.getItem("expenseJar_homeId") || null
    }),

    actions: {
        setUserProfile(profile) {
            this.profile = profile;
        }
    }
});