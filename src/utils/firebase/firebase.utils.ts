import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';
import type { User } from '@/contexts/user.context';
import SHOP_DATA from '@/data/shop-data';

const firebaseConfig = {
  apiKey: 'AIzaSyBr98gbEN0s_VSq7zZT0kfP6MxBsSFHBuE',
  authDomain: 'crwn-clothing-db-31d98.firebaseapp.com',
  projectId: 'crwn-clothing-db-31d98',
  storageBucket: 'crwn-clothing-db-31d98.appspot.com',
  messagingSenderId: '1067718238740',
  appId: '1:1067718238740:web:36c33d4c6725684565bd01'
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const data = {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      };
      await setDoc(userDocRef, data);
    } catch (error: unknown) {
      console.log('error creating the user', (error as Error).message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (
  callback: (user: User | null) => void
) => onAuthStateChanged(auth, callback);

const CATEGORIES_KEY = 'categories';

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: typeof SHOP_DATA
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Init categories');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, CATEGORIES_KEY);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
};
