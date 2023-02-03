import { defineStore } from "pinia";

export const useJarStore = defineStore({
    id: "JarStore",

    state: () => ({
        members: [],
        label: null,
        sortingOption: "expense_date",
        sortingDirection: "DSC",
        isMonthResolved: false,
        filterMember: null,
        filterCategory: null,
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
        },

        setFilterMember(member) {
            this.filterMember = member;
        },

        setFilterCategory(category) {
            this.filterCategory = category;
        },
    }
});