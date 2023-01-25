import SignUpForm from '../../components/sign-up-form/sign-up-form-component';
import SignInForm from '../../components/sign-in-form/sign-in-form-component';

import './authentication.style.scss';

const Sign = () => {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    </div>
  );
};

export default Sign;
