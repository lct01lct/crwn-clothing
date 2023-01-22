import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '@/utils/firebase/firebase.utils';

import SignUpForm from '../sign-up-form/sign-up-form-component';

const Sign = () => {
  useEffect(() => {
    getRedirectResult(auth).then(res => {
      // console.log(res);
    });
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm></SignUpForm>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    </div>
  );
};

export default Sign;
