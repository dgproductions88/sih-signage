import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn3Ic2_jb5H-XL0zARJwyWzHE3n4yKFTw",
  authDomain: "videowall-sih.firebaseapp.com",
  projectId: "videowall-sih",
  storageBucket: "videowall-sih.appspot.com",
  messagingSenderId: "747408624171",
  appId: "1:747408624171:web:b796fdb1ee3e13ffe9f86e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
