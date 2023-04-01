import { defineStore } from "pinia";

export const useGeneralStore = defineStore({
    id: "GeneralStore",

    state: () => ({
        expense_categories: [],
        confirmationDialog: false,
    }),

    actions: {
        setExpenseCategories(categories) {
            this.expense_categories = categories;
        },
        setConfirmationDialog(status) {
            this.confirmationDialog = status;
        }
    },
});