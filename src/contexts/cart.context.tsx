import { useState, useContext, createContext, useEffect } from 'react';
import type { ProductItem } from './product.context';

export type CartItem = ProductItem & {
  quantity: number;
};

export interface CartReducer {
  visible: boolean;
  setVisible: (visible: boolean) => void;

  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addCartItem: (product: ProductItem) => void;

  cartCount: number;
}

export const cartContext = createContext<CartReducer>({
  visible: false,
  setVisible: () => {},
  cartItems: [],
  setCartItems: () => {},
  addCartItem: () => {},
  cartCount: 0,
});

const addProduct = (cartItems: CartItem[], product: ProductItem) => {
  const existCartItem = cartItems.find(cartItem => cartItem.id === product.id);

  if (existCartItem) {
    return cartItems.map(item =>
      item.id === existCartItem.id ? { ...item, quantity: existCartItem.quantity + 1 } : item
    );
  } else {
    const { id, name, price, imageUrl } = product;
    const newCartItem = {
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    };

    return [...cartItems, newCartItem];
  }
};

export const CartProvider = ({ children }: any) => {
  const { Provider } = cartContext;
  const [visible, setVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((prev, item) => {
        return prev + item.quantity;
      }, 0)
    );
  }, [cartItems]);

  const value: CartReducer = {
    visible,
    setVisible,
    cartItems,
    addCartItem: (product: ProductItem) => {
      setCartItems(addProduct(cartItems, product));
    },
    setCartItems,
    cartCount,
  };

  return <Provider value={value}> {children} </Provider>;
};

export const useCartStore = () => useContext(cartContext);
