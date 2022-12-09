import { defineStore } from "pinia";

export const useGeneralStore = defineStore({
    id: "GeneralStore",

    state: () => ({
        expense_categories: []
    }),

    actions: {
        setExpenseCategories(categories) {
            this.expense_categories = categories;
        }
    }
});