import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB1IrI2dIEUknsUnipcQ_1KRoWLyuhBGLM",
  authDomain: "tutorial-751fb.firebaseapp.com",
  projectId: "tutorial-751fb",
  storageBucket: "tutorial-751fb.firebasestorage.app",
  messagingSenderId: "792481934812",
  appId: "1:792481934812:web:8a30aca97c9a30a4ee3319",
  measurementId: "G-H66N0MDBWL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
