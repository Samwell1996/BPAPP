import { useEffect, useRef } from 'react';

import { BackHandler, NativeEventSubscription, Platform } from 'react-native';

type BackHandlerCallback = (event?: unknown) => void;

/**
 * Stores and returns the previous value of a given variable across renders.
 *
 * @param value - The current value to track.
 * @returns The previous value of the provided variable, or null on the first render.
 *
 * @example
 * const previousCount = usePrevious(count);
 */
export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useBackHandlerAndroid = (handler: BackHandlerCallback): void => {
  const savedHandler = useRef<BackHandlerCallback | null>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = () => {
      if (savedHandler.current) {
        savedHandler.current(undefined);
        return true;
      }
      return false;
    };

    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      eventListener,
    );

    return () => backHandler.remove();
  }, []);
};

/**
 * Handles the Android hardware back button.
 *
 * Registers a custom callback that is invoked when the user presses the Android
 * hardware back button. If the callback is defined, it gets executed and prevents
 * the default behavior (i.e., navigating back or exiting the app).
 *
 * @param handler - A function to execute when the back button is pressed.
 *
 * @example
 * useBackHandler(() => {
 *   Alert.alert('Exit?', 'Do you really want to leave?', [
 *     { text: 'Cancel', style: 'cancel' },
 *     { text: 'Exit', onPress: () => BackHandler.exitApp() },
 *   ]);
 * });
 */
export const useBackHandler =
  Platform.OS === 'android' ? useBackHandlerAndroid : () => {};
