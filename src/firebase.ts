// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEnDoDKsAWcLIt2yF_ttBsixLdde7s-e8",
  authDomain: "householdtypescript-91d01.firebaseapp.com",
  projectId: "householdtypescript-91d01",
  storageBucket: "householdtypescript-91d01.appspot.com",
  messagingSenderId: "562407864538",
  appId: "1:562407864538:web:d9c4416cba5ffa9695cde3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db}