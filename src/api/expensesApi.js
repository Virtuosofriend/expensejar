import { api } from "./api";

const URLS = {
    expenses: "items/expenses",
};

export const newExpense = payload => {
    return api.post(`${URLS.expenses}`, payload);
};

export const getExpense = payload => {
    return api.get(`${URLS.expenses}`, payload);
}