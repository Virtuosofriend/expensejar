import { defineStore } from "pinia";

export const useJarStore = defineStore({
    id: "JarStore",

    state: () => ({
        members: []
    }),

    actions: {
        setJarMembers(members) {
            this.members = members;
        }
    }
});