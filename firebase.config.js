// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB_eju26JaHhdrVBRtm9vZub0iN1uer89k",
//   authDomain: "family-chat-a8561.firebaseapp.com",
//   projectId: "family-chat-a8561",
//   storageBucket: "family-chat-a8561.appspot.com",
//   messagingSenderId: "343453866184",
//   appId: "1:343453866184:web:92e99491e4820c35b66dfd",
//   measurementId: "G-4CSSNKW12D",
// };


// Initialize Firebase


const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Create references to Firestore collections
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
