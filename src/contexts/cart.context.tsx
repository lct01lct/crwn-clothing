import { useState, useContext, createContext } from 'react';

export interface Cart {
  visible: boolean;
}

export interface CartReducer {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const cartContext = createContext<CartReducer>({
  visible: false,
  setVisible: () => {},
});

export const CartProvider = ({ children }: any) => {
  const { Provider } = cartContext;
  const [visible, setVisible] = useState<boolean>(false);
  const value: CartReducer = { visible, setVisible };

  return <Provider value={value}> {children} </Provider>;
};

export const useCartStore = () => useContext(cartContext);
