// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIxL6BkN_J2nrgVuLB-bjG3L45lvQT_oE",
    authDomain: "kleia-audit-jp-2026.firebaseapp.com",
    databaseURL: "https://kleia-audit-jp-2026-default-rtdb.firebaseio.com",
    projectId: "kleia-audit-jp-2026",
    storageBucket: "kleia-audit-jp-2026.firebasestorage.app",
    messagingSenderId: "1078553327416",
    appId: "1:1078553327416:web:6aaaba93afee2e130f33cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
