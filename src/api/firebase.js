import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: "AIzaSyAAZKtTZWoWRqYf6gPgrED-g2_MNjDgFV4",
	authDomain: "myexpenses-a5395.firebaseapp.com",
	projectId: "myexpenses-a5395",
	storageBucket: "myexpenses-a5395.appspot.com",
	messagingSenderId: "699862373919",
	appId: "1:699862373919:web:14a7684b8ab0ef2142a72a",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const expensesCollection = db.collection("expenses");
const homesCollection = db.collection("homes");
// const likesCollection = db.collection("likes");

// export utils/refs
export { 
    db,
    auth,
    firebase,
    usersCollection,
    expensesCollection,
    homesCollection
}