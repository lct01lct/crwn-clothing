import type { ProductItem } from './categories.context';
import { createStore } from '@/utils';

export interface CartItem extends ProductItem {
  quantity: number;
}

export const [CartProvider, useCartStore] = createStore('cart-store', {
  states: {
    visible: false,
    cartItems: [] as CartItem[],
  },

  buildMoreActions: ({ cartItems, setCartItems }) => {
    const update = (newCartItems: CartItem[]) => {
      setCartItems(newCartItems);
    };

    return {
      addCartItem(product: ProductItem) {
        update(addProduct(cartItems, product));
      },
      removeCartItem(product: ProductItem) {
        update(removeProduct(cartItems, product));
      },
      clearCartItem(product: ProductItem) {
        update(clearProduct(cartItems, product));
      },
    };
  },

  buildGetters: ({ cartItems }) => {
    const total = cartItems.reduce<number>((prev, item) => prev + item.quantity * item.price, 0);
    const cartCount = cartItems.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);

    return {
      total,
      cartCount,
    };
  },
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
    return cartItems.filter((item, index) => idx !== index);
  }

  return cartItems;
};
