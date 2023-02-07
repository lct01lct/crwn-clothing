import { getCategoriesAndDocuments } from '@/utils/firebase/firebase.utils';
import type { CategoryMap } from './types';
import { createStore } from '@/utils';
import { useEffect } from 'react';
import type { Category } from '@/contexts/types';

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
        const map = data.reduce<{
          [key: Category['title']]: Category['items'];
        }>((prev, docSnapshot) => {
          const { title, items } = docSnapshot as Category;
          prev[title.toLowerCase()] = items;

          return prev;
        }, {});

        setCategoriesMap(map);
      });
    });
  }
});
