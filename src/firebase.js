// Import the functions you need from the SDKs you need
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,onAuthStateChanged,signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGHQdy8w2qTTPdXejt_f4JMFy_IVvxq3Y",
  authDomain: "voosh-2aab6.firebaseapp.com",
  projectId: "voosh-2aab6",
  storageBucket: "voosh-2aab6.firebasestorage.app",
  messagingSenderId: "123451329755",
  appId: "1:123451329755:web:2c5f764a99e7c05d56d0fe",
  measurementId: "G-QHQTFH5D9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Authentication Functions
export const signInWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
  } catch (error) {
      throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
  } catch (error) {
      throw error;
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth,email, password);
      return userCredential.user;
  } catch (error) {
      throw error;
  }
};

export const logOut = async () => {
  try {
      await signOut(auth);
      localStorage.removeItem("token");
  } catch (error) {
      console.error("Error signing out:", error);
      throw error;
  }
};

