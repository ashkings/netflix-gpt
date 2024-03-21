// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj8hWhIGy-oOyblkv_KqA6gz1UueFyCZU",
  authDomain: "netflix-gpt-2a168.firebaseapp.com",
  projectId: "netflix-gpt-2a168",
  storageBucket: "netflix-gpt-2a168.appspot.com",
  messagingSenderId: "1070809330271",
  appId: "1:1070809330271:web:de2e49fc470b79eecd21ea",
  measurementId: "G-YRRYSKZVBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
