import { createContext, useContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { ContextType, PaddingStr } from './type';
import { titleCase } from './utils';

const storeIdsSet = new Set<string>([]);
const storesMap = new Map<string, Function>();

export const createStore = <State extends object, MoreActions extends Record<string, Function>>(
  id: string,
  state: State,
  buildMoreActions?: (store: ContextType<State>) => MoreActions
) => {
  type MethodName = PaddingStr<keyof State, 'set'>;

  if (storeIdsSet.has(id)) {
    throw new Error('[store: Error] Do not set repetitive id .');
  }

  const actions = {} as Record<MethodName, () => void>;

  Object.keys(state).forEach(key => {
    actions[`set${titleCase(key)}` as MethodName] = () => {};
  });

  const context = createContext<ContextType<State>>({
    ...state,
    ...actions,
  } as ContextType<State>);

  const ContextComp: FC<PropsWithChildren> = ({ children }) => {
    const { Provider } = context;
    const value = {} as ContextType<State>;

    Object.entries(state).forEach(([key, state]) => {
      const [data, setData] = useState(state);
      value[key as keyof State] = data;
      value[`set${titleCase(key)}` as MethodName] = setData as ContextType<State>[MethodName];
    });

    const moreActions = buildMoreActions?.(value);

    return <Provider value={Object.assign(value, moreActions)}>{children}</Provider>;
  };

  return {
    Provider: ContextComp,
    useStore: () => useContext(context) as ContextType<State> & MoreActions,
  };
};

const Provider = () => {
  return <></>;
};
