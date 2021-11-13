import * as fb from "./firebase"
import { usersCollection, auth } from "./firebase";

export const loginUser = (payload) => {
	return auth.signInWithEmailAndPassword(payload.email, payload.password);
};

/**
* setUser most likely has to be removed.
* @readonly
*/

export const setUser = payload => {

    return usersCollection.doc(payload.user.uid).set({
        email: payload.user.email,
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
