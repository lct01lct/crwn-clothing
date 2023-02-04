import { useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '@/utils/firebase/firebase.utils';
import { createStore } from '@/utils';

export type User = Record<string, any>;

export const [UserProvider, useUserStore] = createStore('user-store', {
  states: {
    currentUser: null as null | User,
  },

  buildMoreActions({ setCurrentUser }) {
    useEffect(() => {
      const unsubscibe = onAuthStateChangedListener((user: User | null) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });

      return unsubscibe;
    }, []);
  },
});
