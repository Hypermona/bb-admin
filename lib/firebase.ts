// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_APIKEY,
  authDomain: process.env.NEXT_AUTHDOMAIN,
  projectId: process.env.NEXT_PROJECTID,
  storageBucket: process.env.NEXT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_MESSAGINGSENDERID,
  appId: process.env.NEXT_APPID,
  measurementId: process.env.NEXT_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
export const db = getFirestore(app);