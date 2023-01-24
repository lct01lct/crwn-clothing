import { useState, createContext, useContext, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '@/utils/firebase/firebase.utils';

export type User = Partial<Record<string, any>>;
export type UserReducer = {
  currentUser: User | null;
  setCurrentUser: ((user: User | null) => void) | null;
};

export const UserContext = createContext<UserReducer>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value: UserReducer = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscibe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscibe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserStore = () => useContext(UserContext);
