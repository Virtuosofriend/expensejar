import { resolvementsCollection, firebase } from "./firebase";

export const createResolvement = payload => {
    return resolvementsCollection.doc().set({
        ...payload,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const fetchResolvements = home => {
    return resolvementsCollection
        .where("homeId", "==", home)
        .get();
};
