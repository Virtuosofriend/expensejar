import { expensesCollection, firebase } from "./firebase";

export const createExpense = (payload) => {
    expensesCollection.doc().set({
        ...payload,
        createdAt : firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const fetchLastFiveTransactions = (payload) => {
    let today = new Date();
    return expensesCollection
        .where("userId", "==", payload.userId)
        .where("home", "==", payload.home)
        // .orderBy("createdAt", "desc")
        .get();
};

export const fetchTotalMonthExpenses = (month, year = new Date().getFullYear() ) => {
    return expensesCollection
        .where("date", ">=", `${ year }-${ month}-01`)
        .where("date", "<=", `${ year }-${ month}-31`)
        .get();
};