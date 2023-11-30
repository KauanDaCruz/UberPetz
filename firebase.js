
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import  {  getDatabase  } from 'firebase/database'





const firebaseConfig = {
  apiKey: "AIzaSyBisloOZQKK9QFdwX_4qACJ0SwxxDTzcqA",
  authDomain: "test-auth-e379a.firebaseapp.com",
  projectId: "test-auth-e379a",
  storageBucket: "test-auth-e379a.appspot.com",
  messagingSenderId: "965873187585",
  appId: "1:965873187585:web:593ff5e00441376b403900"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

}

const db = getDatabase();

export { db }

export default firebaseConfig