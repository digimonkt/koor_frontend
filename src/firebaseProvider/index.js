import { initializeApp } from "firebase/app";

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
