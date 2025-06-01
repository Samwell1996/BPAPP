import { createContext, useContext } from 'react';

import { rootStore } from '../helpers/rootStoreInstance';
import { RootStore } from '../root';

export const StoresContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({
  children,
  value = rootStore,
}: {
  children: React.ReactNode;
  value?: RootStore;
}) => <StoresContext.Provider value={value}>{children}</StoresContext.Provider>;

export const useStores = () => useContext(StoresContext);
