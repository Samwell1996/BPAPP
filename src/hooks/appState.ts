import { useEffect } from 'react';

import { AppState } from 'react-native';

import { APP_STATES } from '@constants/appState';
import { usePrevious } from '@hooks/common';
import { useAppState } from '@services/appState';
import { useDevice } from '@styles/theme';

type Callback = () => void;

export const useAppReopened = (callback: Callback) => {
  const appState = useAppState();
  const prevAppState = usePrevious(appState);

  useEffect(() => {
    if (
      prevAppState === APP_STATES.BACKGROUND &&
      appState === APP_STATES.ACTIVE
    ) {
      callback();
    }
  }, [appState]);
};

export const useAppResume = (callback: Callback) => {
  const appState = useAppState();
  const prevAppState = usePrevious(appState);

  useEffect(() => {
    if (
      (prevAppState === APP_STATES.INACTIVE ||
        prevAppState === APP_STATES.BACKGROUND) &&
      appState === APP_STATES.ACTIVE
    ) {
      callback();
    }
  }, [appState]);
};

export const useAppBackgrounded = (callback: Callback) => {
  const appState = useAppState();
  const prevAppState = usePrevious(appState);

  useEffect(() => {
    if (
      prevAppState === APP_STATES.INACTIVE &&
      appState === APP_STATES.BACKGROUND
    ) {
      callback();
    }
  }, [appState]);
};

export const useAppInactive = (callback: Callback) => {
  const appState = useAppState();
  const prevAppState = usePrevious(appState);
  const device = useDevice();

  useEffect(() => {
    if (
      prevAppState === APP_STATES.ACTIVE &&
      appState === APP_STATES.INACTIVE &&
      device.isIOS
    ) {
      callback();
    }

    if (
      prevAppState === APP_STATES.ACTIVE &&
      appState === APP_STATES.BACKGROUND &&
      device.isAndroid
    ) {
      callback();
    }
  }, [appState]);
};

export const useAppIsInactive = () => {
  const appState = useAppState();

  return appState === APP_STATES.BACKGROUND || appState === APP_STATES.INACTIVE;
};

export const useAppIsActive = () => useAppState() === APP_STATES.ACTIVE;

export const getIsAppActive = () => AppState.currentState === APP_STATES.ACTIVE;

export const useAppIsBackground = () => useAppState() === APP_STATES.BACKGROUND;
