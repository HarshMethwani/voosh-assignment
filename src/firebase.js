// Import the functions you need from the SDKs you need
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,onAuthStateChanged,signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTo-mk8ZgVtHkOztsZiQgKFX4RCo9QoXo",
  authDomain: "fir-f7cba.firebaseapp.com",
  projectId: "fir-f7cba",
  storageBucket: "fir-f7cba.firebasestorage.app",
  messagingSenderId: "855364884349",
  appId: "1:855364884349:web:31a8a0998a77ef30931e14",
  measurementId: "G-43E4BY2L66"
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
  } catch (error) {
      console.error("Error signing out:", error);
      throw error;
  }
};

