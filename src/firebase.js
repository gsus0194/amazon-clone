import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcJSynEpQsN3NS_4yNkBwAvZxRhm_U5Vg",
  authDomain: "amz-clone194.firebaseapp.com",
  databaseURL: "https://amz-clone194.firebaseio.com",
  projectId: "amz-clone194",
  storageBucket: "amz-clone194.appspot.com",
  messagingSenderId: "289433059808",
  appId: "1:289433059808:web:66273e7e22b0f724d6ab85",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
