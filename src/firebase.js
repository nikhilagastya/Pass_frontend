import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4FoaW6ocIxXrxrT4YVejUTSSMJpEMfGM",
  authDomain: "passes-auth.firebaseapp.com",
  projectId: "passes-auth",
  storageBucket: "passes-auth.appspot.com",
  messagingSenderId: "625043498360",
  appId: "1:625043498360:web:5608464457e80448d6d48d",
  measurementId: "G-E1LFKHP6HM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);