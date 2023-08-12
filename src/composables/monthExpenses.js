import { ref } from "vue";
import { properNumberRound } from "@/helpers/generalFunctions";

export const memberExpenses = ref([]);
export const activeUserSummary = ref(0);
export const primaryUserSummary = ref(0);
export const secondaryUserSummary = ref(0);


export const setExpenses = (expenseArray, jarMembers, activeUserId) => {
    memberExpenses.value = [];
    jarMembers.forEach(member => {
        let membersObj = {...member};
        let addExpenses = aggregateExpensesPerMonth();
        let currentUserSummary = 0;
        for (let value of expenseArray) {
            if ( value.user_created === member.id ) {
                currentUserSummary = addExpenses(value);
            }
        }
        membersObj.monthlyExpensesSummary = properNumberRound(currentUserSummary);
        memberExpenses.value.push(membersObj); 
    });
    activeUserSummary.value = memberExpenses.value.find(expense => expense.id === activeUserId);
    primaryUserSummary.value = memberExpenses.value.find(expense => expense.id === jarMembers[0].id);
    secondaryUserSummary.value = memberExpenses.value.find(expense => expense.id === jarMembers[1].id);

    return {
        activeUserSummary: activeUserSummary.value.monthlyExpensesSummary,
        primaryUserSummary: primaryUserSummary.value.monthlyExpensesSummary,
        secondaryUserSummary: secondaryUserSummary.value.monthlyExpensesSummary,
        memberExpenses
    }
};

function aggregateExpensesPerMonth() {
    let sum = 0;
    function summary(expense) {
        return sum += expense.amount;
    }

    return summary;
}