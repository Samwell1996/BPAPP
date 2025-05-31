import { createContext, useContext } from 'react';

import { createRootStore } from '../helpers/creator';
import { RootStore } from '../root';

const defaultStore = createRootStore();

export const StoresContext = createContext<RootStore>(defaultStore);

export const StoreProvider = ({
  children,
  value = defaultStore,
}: {
  children: React.ReactNode;
  value?: RootStore;
}) => <StoresContext.Provider value={value}>{children}</StoresContext.Provider>;

export const useStores = () => useContext(StoresContext);
