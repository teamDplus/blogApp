import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVbTwLsYdUyjpzQt4b6zJXHiiknpmuRuw",
  authDomain: "blogapp-c1052.firebaseapp.com",
  projectId: "blogapp-c1052",
  storageBucket: "blogapp-c1052.appspot.com",
  messagingSenderId: "500765636974",
  appId: "1:500765636974:web:dfd60b760ba80e3fff297f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);