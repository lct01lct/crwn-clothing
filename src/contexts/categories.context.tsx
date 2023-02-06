import { getCategoriesAndDocuments } from '@/utils/firebase/firebase.utils';
import type { CategoryMap } from './types';
import { createStore } from '@/utils';
import { useEffect } from 'react';

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export const useCategoriesStore = createStore('categories-store', {
  states: { categoriesMap: {} as CategoryMap },

  buildMoreActions: ({ setCategoriesMap }) => {
    useEffect(() => {
      getCategoriesAndDocuments().then((data) => {
        setCategoriesMap(data);
      });
    });
  }
});
