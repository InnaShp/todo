import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
export default firebaseDB;