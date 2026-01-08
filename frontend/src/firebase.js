// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfl0uzTOw6lfQzRRYwzNbsMtRjrRYGyBY",
  authDomain: "smart-issue-board-2e6fc.firebaseapp.com",
  projectId: "smart-issue-board-2e6fc",
  storageBucket: "smart-issue-board-2e6fc.firebasestorage.app",
  messagingSenderId: "441313069568",
  appId: "1:441313069568:web:50df8e10ca9f3f9a7f66e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Named exports for Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
