// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApmoqVqvncI7I6ERaK6ZqX2ed9kca_fyc",
  authDomain: "fir-hemdry-app-dev.firebaseapp.com",
  projectId: "fir-hemdry-app-dev",
  storageBucket: "fir-hemdry-app-dev.appspot.com",
  messagingSenderId: "675668983085",
  appId: "1:675668983085:web:456c19eeae4e7614bae7a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
