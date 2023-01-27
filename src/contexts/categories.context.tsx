import { createContext, useContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '@/utils/firebase/firebase.utils';
import type { Category, CategoryMap } from './types';

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface CategoriesReducer {
  categoriesMap: CategoryMap;
  setCategoriesMap: (products: CategoryMap) => void;
}

const categoriesContext = createContext<CategoriesReducer>({
  categoriesMap: {},
  setCategoriesMap: () => {},
});

export const CategoriesProvider = ({ children }: any) => {
  const { Provider } = categoriesContext;
  const [categoriesMap, setCategoriesMap] = useState<CategoryMap>({});
  const value: CategoriesReducer = { categoriesMap, setCategoriesMap };

  useEffect(() => {
    getCategoriesAndDocuments().then(data => {
      setCategoriesMap(data);
    });
  }, []);

  return <Provider value={value}> {children} </Provider>;
};

export const useCategoriesStore = () => useContext(categoriesContext);
