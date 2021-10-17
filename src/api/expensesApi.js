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