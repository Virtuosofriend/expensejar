import { api } from "./api";

const URLS = {
    expenses: "items/expenses",
    resolvements: "items/resolvements"
};

export const newExpense = payload => {
    return api.post(`${URLS.expenses}`, payload);
};

export const getExpense = payload => {
    return api.get(`${URLS.expenses}`, payload);
};

export const newResolvement = payload => {
    return api.post(`${ URLS.resolvements }`, payload)
};

export const getResolvement = payload => {
    return api.get(`${ URLS.resolvements }`, payload)
};