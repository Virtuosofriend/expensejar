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

export const getExpenseDetails = expenseId => {
    return api.get(`${URLS.expenses}/${expenseId}`);
};

export const deleteExpenseDetails = expenseId => {
    return api.delete(`${URLS.expenses}/${expenseId}`);
};

export const updateExpenseDetails = (expenseId, payload) => {
    return api.patch(`${URLS.expenses}/${expenseId}`, payload);
};

export const getExpenseAggregation = payload => {
    return api.get(`${URLS.expenses}?aggregate[sum]=amount&groupBy[]=year(expense_date),month(expense_date)`, payload);
}