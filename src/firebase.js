
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";

// Your Firebase config (replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyBZXTMVFb91LWdksQP1nt4GAJ-2BWa_OuU",
    authDomain: "dashboard-33027.firebaseapp.com",
    projectId: "dashboard-33027",
    storageBucket: "dashboard-33027.firebasestorage.app",
    messagingSenderId: "950425098760",
    appId: "1:950425098760:web:3c7744a5a2fd1762414fbd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

