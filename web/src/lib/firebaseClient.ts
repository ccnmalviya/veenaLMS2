import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: replace with the final, correct config from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyC85KACqcAl8tnrzfwybbuMXKspvLfkMBQ",
  authDomain: "veena-lms.firebaseapp.com",
  projectId: "veena-lms",
  storageBucket: "veena-lms.firebasestorage.app",
  messagingSenderId: "843457897028",
  appId: "1:843457897028:web:62a75a285947e39ca75211",
  measurementId: "G-BVZ10GTDXJ",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  app = getApps()[0]!;
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };