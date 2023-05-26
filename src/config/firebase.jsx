import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC6B-rjnZhUTiO6fJap_n8lFbsmaH7DWYQ",
  authDomain: "mui-stepperform.firebaseapp.com",
  databaseURL: "https://mui-stepperform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mui-stepperform",
  storageBucket: "mui-stepperform.appspot.com",
  messagingSenderId: "957481426759",
  appId: "1:957481426759:web:ff97c3dada270cb4bef662"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getDatabase(app)
  const storage = getStorage(app)

  export {auth,db,storage}