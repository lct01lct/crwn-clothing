import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren
} from 'react';
import { getCategoriesAndDocuments } from '@/utils/firebase/firebase.utils';
import type { CategoryMap } from './types';

export interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface CategoriesStoreState {
  categoriesMap: CategoryMap;
}

type PaddingStr<
  State,
  Str extends string
> = State extends `${infer First}${infer Rest}`
  ? `${Str}${Uppercase<First>}${Rest}`
  : never;
type ActionType<Store extends Record<string, any>> = {
  [StateType in keyof Store as PaddingStr<StateType, 'set'>]: (
    newState: Store[StateType]
  ) => void;
};
type ContextType<Store extends Record<string, any>> = Store & ActionType<Store>;

const categoriesContext = createContext<ContextType<CategoriesStoreState>>({
  categoriesMap: {},
  setCategoriesMap: () => {}
});

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = categoriesContext;
  const [state, dispatch] = useState<{ categoriesMap: CategoryMap }>({
    categoriesMap: {}
  });

  const setCategoriesMap = (data: CategoryMap) => {
    dispatch((state) => ({ ...state, data }));
  };

  useEffect(() => {
    getCategoriesAndDocuments().then((data) => {
      dispatch((state) => ({ ...state, data }));
    });
  }, []);

  const value = {
    ...state,
    setCategoriesMap
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useCategoriesStore = () => {
  const baseStore = useContext(categoriesContext);

  const { categoriesMap, setCategoriesMap } = baseStore;

  return { categoriesMap, setCategoriesMap };
};
