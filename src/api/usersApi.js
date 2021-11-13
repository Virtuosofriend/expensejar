import { usersCollection, firebase } from "./firebase";

export const fetchUsers = () => {
    return usersCollection.get();
};
