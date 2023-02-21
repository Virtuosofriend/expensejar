import { publicApi } from "./api";

const URLS = {
    categories: "items/expenses_categories",
};

export const fetchExpensesCategories = () => {
    return publicApi.get(`${URLS.categories}`);
};
