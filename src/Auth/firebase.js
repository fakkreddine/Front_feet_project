// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ8t9VaEGckhV1KQEN-NzAU_KcRU4scck",
  authDomain: "fetprojet.firebaseapp.com",
  projectId: "fetprojet",
  storageBucket: "fetprojet.appspot.com",
  messagingSenderId: "1016616217443",
  appId: "1:1016616217443:web:c8d44e8f22256349944156",
  measurementId: "G-J4Z5FYTKSP",
  databaseURL: "https://fetprojet-default-rtdb.firebaseio.com"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const database = getDatabase(app);