import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseApp";

function createAuth() {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // Fast Refresh can evaluate this module again after Auth is initialized.
    if (error.code === "auth/already-initialized") return getAuth(app);
    throw error;
  }
}

export const auth = createAuth();
export const db = getFirestore(app);
