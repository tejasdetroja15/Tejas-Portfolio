// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbyV5-6liDZMDZNguMQL0ycDEVPhO-Hv0",
  authDomain: "portfolio-60466.firebaseapp.com",
  projectId: "portfolio-60466",
  storageBucket: "portfolio-60466.firebasestorage.app",
  messagingSenderId: "693744675455",
  appId: "1:693744675455:web:93b1860920b89e4e6f2d4a",
  measurementId: "G-WN72DW2ESQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection };