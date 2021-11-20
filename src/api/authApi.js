import * as fb from "./firebase"
import { usersCollection, auth } from "./firebase";

export const loginUser = (payload) => {
	return auth.signInWithEmailAndPassword(payload.email, payload.password);
};


export const setUser = payload => {
    return usersCollection.doc(payload.user_id).set({
        email: payload.email,
        username: payload.name
    });
};

export const registerUser = (payload) => {
	return fb.auth.createUserWithEmailAndPassword(
		payload.email,
		payload.password
	)
};

export const logoutUser = () => {
    return fb.auth.signOut();
};
