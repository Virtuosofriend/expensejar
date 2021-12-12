import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_KEY,
	authDomain: "myexpenses-a5395.firebaseapp.com",
	projectId: "myexpenses-a5395",
	storageBucket: "myexpenses-a5395.appspot.com",
	messagingSenderId: "699862373919",
	appId: "1:699862373919:web:14a7684b8ab0ef2142a72a",
};

// firebase.initializeApp(firebaseConfig);
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
  
// utils
// const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const expensesCollection = db.collection("expenses");
const homesCollection = db.collection("homes");

// export utils/refs
export { 
    auth,
    firebase,
    usersCollection,
    expensesCollection,
    homesCollection
}