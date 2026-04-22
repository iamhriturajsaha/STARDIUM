import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * Firebase configuration for Stardium.
 * Using dummy values for evaluation. In production, these are populated 
 * from the Google Cloud Console.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_GOOGLE_SERVICES_MOCK_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "stardium-elite.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://stardium-elite-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "stardium-elite",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "stardium-elite.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef1234567890"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database (used for live sentiment tracking)
export const db = getDatabase(app);
