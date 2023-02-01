import { createContext, useContext, useEffect, useReducer } from 'react';
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

const userReducer = (
  state: {
    currentUser: User | null;
  },
  action: {
    type: 'set_current_user';
    payload: User | null;
  }
) => {
  const { type, payload } = action;

  switch (type) {
    case 'set_current_user':
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }: any) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, { currentUser: null });
  const setCurrentUser = (user: User | null) => {
    dispatch({ type: 'set_current_user', payload: user });
  };

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
