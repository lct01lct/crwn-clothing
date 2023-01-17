import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
