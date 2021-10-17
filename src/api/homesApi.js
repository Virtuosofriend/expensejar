import { homesCollection } from "./firebase";

export const fetchHomes = payload => {
    return homesCollection.where("userId", "==", payload).get();
};