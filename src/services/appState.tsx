import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { AppState, AppStateStatus } from 'react-native';

export const AppStateContext = createContext<AppStateStatus | null>(null);

export const useAppState = () => useContext(AppStateContext);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    // The AppState is "inactive" on iOS during a cold start.
    setAppState(AppState.currentState);
  }, []);

  useEffect(() => {
    const listener = AppState.addEventListener('change', setAppState);

    return () => listener.remove();
  }, []);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};
