import { useState, useContext, createContext, useEffect, useReducer } from 'react';
import type { ProductItem } from './categories.context';

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface CartStore {
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

export const cartContext = createContext<CartStore>({
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
    cartItems.splice(idx, 1);
  }

  return cartItems;
};

const initCartState = {
  visible: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

interface CartState {
  visible: boolean;
  cartItems: CartItem[];
  cartCount: number;
  total: number;
}

type ActionType<Type extends string, Payload> = { type: Type; payload: Payload };
type CartAction =
  | ActionType<'set_visible', boolean>
  | ActionType<'set_cartItems', { cartItems: CartItem[]; cartCount: number; total: number }>;

const cartReducer = (state: CartState, { type, payload }: CartAction) => {
  switch (type) {
    case 'set_visible':
      return {
        ...state,
        visible: payload,
      };
    case 'set_cartItems':
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }: any) => {
  const { Provider } = cartContext;
  const [state, dispatch] = useReducer(cartReducer, initCartState);
  const { cartItems } = state;

  const setVisible = (visible: boolean) => {
    dispatch({ type: 'set_visible', payload: visible });
  };

  const updateCartReducer = (newCartItems: CartItem[]) => {
    const cartCount = newCartItems.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);
    const total = newCartItems.reduce<number>((prev, item) => prev + item.quantity * item.price, 0);

    dispatch({ type: 'set_cartItems', payload: { cartCount, total, cartItems: newCartItems } });
  };

  const value: CartStore = {
    ...state,
    setVisible,
    addCartItem(product) {
      updateCartReducer(addProduct(cartItems, product));
    },
    removeCartItem(product) {
      updateCartReducer(removeProduct(cartItems, product));
    },
    clearCartItem(product) {
      updateCartReducer(clearProduct(cartItems, product));
    },
    setCartItems: updateCartReducer,
  };

  return <Provider value={value}> {children} </Provider>;
};

export const useCartStore = () => useContext(cartContext);
