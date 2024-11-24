import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGc-0DsAKlIj5yU-6u9DHwsL7iphw6hrs",
  authDomain: "shoes-app-14e23.firebaseapp.com",
  projectId: "shoes-app-14e23",
  storageBucket: "shoes-app-14e23.firebasestorage.app",
  messagingSenderId: "224227419453",
  appId: "1:224227419453:web:44ea4686fac4cb017c5154",
  measurementId: "G-6RFP3SL8B1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
