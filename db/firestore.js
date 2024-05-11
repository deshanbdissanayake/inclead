// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "inclead-2bff6.firebaseapp.com",
  projectId: "inclead-2bff6",
  storageBucket: "inclead-2bff6.appspot.com",
  messagingSenderId: "328510662118",
  appId: "1:328510662118:web:db1346adbbfcc59c52a227"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db}
