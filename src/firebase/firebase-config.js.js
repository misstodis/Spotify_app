// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCS7ONInqLC1lsxMBPThjMMWWwV_amNAx4',
  authDomain: 'kapoo-f708e.firebaseapp.com',
  projectId: 'kapoo-f708e',
  storageBucket: 'kapoo-f708e.appspot.com',
  messagingSenderId: '359444481358',
  appId: '1:359444481358:web:dc1230f4985b6ff2444a1f',
  measurementId: 'G-RXTTWFE0FE',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { db, storage, auth };
