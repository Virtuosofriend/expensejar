import { defineStore } from "pinia";

export const useJarStore = defineStore({
    id: "JarStore",

    state: () => ({
        members: [],
        label: null
    }),

    actions: {
        setJarMembers(members) {
            this.members = members;
        },

        setJarLabel(label) {
            this.label = label;
        }
    }
});