import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkLvauc7z17gjaYqXenu8j9Vca7yJ_atI",
  authDomain: "chat-with-pdf-d088f.firebaseapp.com",
  projectId: "chat-with-pdf-d088f",
  storageBucket: "chat-with-pdf-d088f.appspot.com",
  messagingSenderId: "1021824711878",
  appId: "1:1021824711878:web:cffde7200465f203696bc7",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
