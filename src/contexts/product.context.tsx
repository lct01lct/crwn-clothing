import { createContext, useContext, useState } from 'react';
import PRODUCTS_DATA from '@/data/shop-data.json';

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface ProductReducer {
  products: ProductItem[];
  setProducts: (products: ProductItem[]) => void;
}

const ProductsContext = createContext<ProductReducer>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }: any) => {
  const { Provider } = ProductsContext;
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS_DATA);
  const value: ProductReducer = { products, setProducts };

  return <Provider value={value}> {children} </Provider>;
};

export const useProductsStore = () => useContext(ProductsContext);
