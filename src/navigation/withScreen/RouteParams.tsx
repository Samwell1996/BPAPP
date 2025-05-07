import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  ReactNode,
} from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/types';

type SelectorFn<T> = (value: Record<string, any>) => T;

interface Store {
  value: Record<string, any>;
  subscribe: (listener: () => void) => () => void;
  notify: () => void;
}

const RouteParamsContext = createContext<Store | null>(null);

const StoreProvider = ({
  value,
  children,
}: {
  value: Record<string, any>;
  children: ReactNode;
}) => {
  const storeRef = useRef<Store | null>(null);

  const store = storeRef.current;

  if (!store) {
    const listeners = new Set<() => void>();

    storeRef.current = {
      value,
      subscribe: listener => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      notify: () => listeners.forEach(listener => listener()),
    };
  }

  useEffect(() => {
    if (!store) {
      return;
    }
    if (store?.value !== value) {
      store.value = value;
      store.notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <RouteParamsContext.Provider value={store}>
      {children}
    </RouteParamsContext.Provider>
  );
};

/**
 * Hook to access a selected slice of route.params with optimal performance.
 * @param selector - Function to extract a specific value from route.params
 */
export const useRouteParamsSelector = <T,>(selector: SelectorFn<T>): T => {
  const store = useContext(RouteParamsContext);
  if (!store) {
    throw new Error('useRouteParamsSelector must be used within RouteParams');
  }

  return useSyncExternalStore(store.subscribe, () => selector(store.value));
};

/**
 * Provides a context-based system for accessing route.params
 * without causing unnecessary re-renders when unrelated props change.
 */
const RouteParams = ({ children }: { children: ReactNode }) => {
  const route = useRoute<RouteProp<RootStackParamList>>();

  return <StoreProvider value={route.params ?? {}}>{children}</StoreProvider>;
};

export default RouteParams;
