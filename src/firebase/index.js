import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "todo-app-76522.firebaseapp.com",
  projectId: "todo-app-76522",
  storageBucket: "todo-app-76522.appspot.com",
  messagingSenderId: "397283032856",
  appId: "1:397283032856:web:a292ef64f229ef2ad9e86d"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
export default firebaseDB;