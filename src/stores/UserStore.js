import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "UserStore",

    state: () => ({
        profile: JSON.parse(localStorage.getItem("expensejar-profile")) || {},
        active_jar: localStorage.getItem("expensejar-activejar") || 1
    }),

    actions: {
        setUserProfile(profile) {
            this.profile = profile;
        }
    },

    getters: {
        getUserJars() {
            return this.profile.member_of_jars;
        }
    }
});