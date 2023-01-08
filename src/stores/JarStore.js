import { defineStore } from "pinia";

export const useJarStore = defineStore({
    id: "JarStore",

    state: () => ({
        members: [],
        label: null,
        sortingOption: "expense_date",
        sortingDirection: "DSC",
    }),

    actions: {
        setJarMembers(members) {
            this.members = members;
        },

        setJarLabel(label) {
            this.label = label;
        },

        setSortingOption(option) {
            this.sortingOption = option;
        },

        setSortingDirection(direction) {
            this.sortingDirection = direction;
        }
    }
});