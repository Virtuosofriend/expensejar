import { defineStore } from "pinia";

export const useJarStore = defineStore({
    id: "JarStore",

    state: () => ({
        members: [],
        label: null,
        sortingOption: "expense_date",
        sortingDirection: "DSC",
        isMonthResolved: false
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
        },

        setIsMonthResolved(status) {
            this.isMonthResolved = status;
        }
    }
});