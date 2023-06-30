// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDy3BcvY3MHyTvlMj4feFYmUrPxJvLLkuk",
    authDomain: "what-s-the-plan-54955.firebaseapp.com",
    databaseURL: "https://what-s-the-plan-54955-default-rtdb.firebaseio.com",
    projectId: "what-s-the-plan-54955",
    storageBucket: "what-s-the-plan-54955.appspot.com",
    messagingSenderId: "495818320229",
    appId: "1:495818320229:web:fc23b54fa9d5c6d6f5998c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)