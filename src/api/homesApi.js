import { homesCollection, firebase } from "./firebase";

export const fetchHomes = payload => {
    return homesCollection.where("userId", "==", payload).get();
};

export const fetchCoHostedHomes = payload => {
    return homesCollection.where("extraUser_id", "==", payload).get();
};

export const createNewHome = payload => {
    homesCollection.doc().set({
        ...payload,
        createdAt : firebase.firestore.FieldValue.serverTimestamp()
    });
};