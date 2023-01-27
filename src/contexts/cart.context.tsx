import { useState, useContext, createContext, useEffect } from 'react';
import type { ProductItem } from './categories.context';

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface CartReducer {
  visible: boolean;
  setVisible: (visible: boolean) => void;

  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addCartItem: (product: ProductItem) => void;
  removeCartItem: (product: ProductItem) => void;
  clearCartItem: (product: ProductItem) => void;

  cartCount: number;
  total: number;
}

export const cartContext = createContext<CartReducer>({
  visible: false,
  setVisible: () => {},
  cartItems: [],
  setCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  total: 0,
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

const removeProduct = (cartItems: CartItem[], product: ProductItem) => {
  const existCartItem = cartItems.find(cartItem => cartItem.id === product.id);

  if (!existCartItem) {
    return cartItems;
  } else if (existCartItem.quantity === 1) {
    return cartItems.filter(item => item !== existCartItem);
  } else {
    return cartItems.map(item =>
      item === existCartItem
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );
  }
};

const clearProduct = (cartItems: CartItem[], product: ProductItem) => {
  const idx = cartItems.findIndex(cartItem => cartItem.id === product.id);

  if (idx > -1) {
    return cartItems.splice(idx, 1);
  } else {
    return cartItems;
  }
};

export const CartProvider = ({ children }: any) => {
  const { Provider } = cartContext;
  const [visible, setVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((prev, item) => {
        return prev + item.quantity;
      }, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setTotal(cartItems.reduce<number>((prev, item) => prev + item.quantity * item.price, 0));
  }, [cartItems]);

  const value: CartReducer = {
    visible,
    setVisible,
    cartItems,
    addCartItem: product => {
      setCartItems(addProduct(cartItems, product));
    },
    removeCartItem(product) {
      setCartItems(removeProduct(cartItems, product));
    },
    clearCartItem(product) {
      setCartItems(clearProduct(cartItems, product));
    },
    setCartItems,
    cartCount,
    total,
  };

  return <Provider value={value}> {children} </Provider>;
};

export const useCartStore = () => useContext(cartContext);
