import { api } from "./api";

const URLS = {
    categories: "items/expenses_categories",
};

export const fetchExpensesCategories = () => {
    return api.get(`${URLS.categories}`);
};
