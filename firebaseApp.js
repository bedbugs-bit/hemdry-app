import { getApp, getApps, initializeApp } from "firebase/app";

const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (!config.apiKey || !config.projectId || !config.appId) {
  throw new Error(
    "Firebase is not configured. Copy .env.example to .env, fill in your Firebase web app settings, and restart Expo.",
  );
}

export const app = getApps().length ? getApp() : initializeApp(config);
