import { ref } from "vue";

// Set state
export const month_expenses = ref(0);
export const jar_summary = ref(0);

export const setExpenses = (expenseArray, currentUserId) => {
    let addExpensesForJar = aggregateExpensesPerMonth();
    let addExpensesForCurrentUser = aggregateExpensesPerMonth();
    let summaryOfJar = 0;
    let currentUserSummary = 0;
    for (let value of expenseArray) {
        summaryOfJar = addExpensesForJar(value);
        if ( value.user_created === currentUserId ) {
            currentUserSummary = addExpensesForCurrentUser(value);
        }
    }

    jar_summary.value = summaryOfJar;
    month_expenses.value = currentUserSummary;
};

function aggregateExpensesPerMonth() {
    let sum = 0;
    function summary(expense) {
        return sum += expense.amount;
    }

    return summary;
}