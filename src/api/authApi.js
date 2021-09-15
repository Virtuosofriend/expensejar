import * as fb from "./firebase"

export const loginUser = (payload) => {
	return fb.auth.signInWithEmailAndPassword(payload.email, payload.password)
}

export const registerUser = (payload) => {
	return fb.auth.createUserWithEmailAndPassword(
		payload.email,
		payload.password
	)
}
