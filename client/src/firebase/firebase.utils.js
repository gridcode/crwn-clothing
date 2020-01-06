import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDVD67pnFT18bGQz_tndAv2HmzDk9-gNv0",
  authDomain: "crwn-clothing-70290.firebaseapp.com",
  databaseURL: "https://crwn-clothing-70290.firebaseio.com",
  projectId: "crwn-clothing-70290",
  storageBucket: "crwn-clothing-70290.appspot.com",
  messagingSenderId: "608149963962",
  appId: "1:608149963962:web:60a02d26b653810b412e83"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
