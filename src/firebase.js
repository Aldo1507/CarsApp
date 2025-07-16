// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6mno2QpX7RSD1PjNFgsweWxlIraP3OWQ",
  authDomain: "car-app-652f1.firebaseapp.com",
  projectId: "car-app-652f1",
  storageBucket: "car-app-652f1.firebasestorage.app",
  messagingSenderId: "638515292428",
  appId: "1:638515292428:web:f5a32b1386c077d59c8129",
  measurementId: "G-N6XWL8GESM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const db = getFirestore(app);

export { app, auth, db };
