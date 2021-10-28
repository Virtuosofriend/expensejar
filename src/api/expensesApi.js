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
        .limit(5)
        .get();
};

export const fetchTotalMonthExpenses = month => {
    let today = new Date();
    const year = today.getFullYear();
    return expensesCollection
        .where("date", ">=", `${ year }-${ month}-01`)
        .where("date", "<=", `${ year }-${ month}-31`)
        .get();
};