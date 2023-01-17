import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBr98gbEN0s_VSq7zZT0kfP6MxBsSFHBuE',
  authDomain: 'crwn-clothing-db-31d98.firebaseapp.com',
  projectId: 'crwn-clothing-db-31d98',
  storageBucket: 'crwn-clothing-db-31d98.appspot.com',
  messagingSenderId: '1067718238740',
  appId: '1:1067718238740:web:36c33d4c6725684565bd01'
};

const firebaseApp = initializeApp(firebaseConfig);

const provide = new GoogleAuthProvider();
provide.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provide);
