import { createContext, useContext } from 'react';

import { stores, RootStore } from '../index';

export const StoresContext = createContext<RootStore>(stores);

export const useStores = () => useContext(StoresContext);
