import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config.js';

export function logout() {
  // sign out is  funciton of firebase
  // this will return a promise
  return signOut(auth);
}
