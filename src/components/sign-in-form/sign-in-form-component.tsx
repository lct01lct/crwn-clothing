import { useState } from 'react';
import type { FormEvent } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '@/components/button/button.component';
import './sign-in-form.style.scss';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '@/utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error: unknown) {
      const code = (error as any).code;
      if (code === 'auth/wrong-password') {
        alert('incorrent password for email');
      } else if (code === 'auth/user-not-found') {
        alert('no user associated with this email');
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button onClick={SignInWithGoogle} buttonType="google" type="button">
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
