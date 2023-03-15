// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC83TvpwMNOyyVvBGlabNnnP9XrGK4xqHg",
  authDomain: "test-proj-380607.firebaseapp.com",
  projectId: "test-proj-380607",
  storageBucket: "test-proj-380607.appspot.com",
  messagingSenderId: "788879371406",
  appId: "1:788879371406:web:11e522f8f437e39419eddf",
};

// Initialize Firebase
export const firebaseInitialize = () => initializeApp(firebaseConfig);
