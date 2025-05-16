// Import the functions you need from the SDKs you need
import '@expo/metro-runtime';
import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6U2ij_0FAnL0OSc265E_VtmfxydCkgm8",
  authDomain: "micomidafavorita-12fa7.firebaseapp.com",
  projectId: "micomidafavorita-12fa7",
  storageBucket: "micomidafavorita-12fa7.firebasestorage.app",
  messagingSenderId: "160212341562",
  appId: "1:160212341562:web:fb63b48a49e460bc90f603",
  measurementId: "G-5NB1W32YB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
