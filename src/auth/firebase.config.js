// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbgEAKr-iuTOjNqdJJWiAZVClHHVVuUjY",
  authDomain: "study-buddy-1d552.firebaseapp.com",
  projectId: "study-buddy-1d552",
  storageBucket: "study-buddy-1d552.appspot.com", 
  messagingSenderId: "419971190652",
  appId: "1:419971190652:web:9d8214d21b0aeceadc1ef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
