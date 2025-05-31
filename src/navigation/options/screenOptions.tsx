import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { SCREEN_NAMES } from '@constants/navigation';
import type { AppScreenKey } from '@navigation/types';

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: 'default' as const,
  presentation: 'card' as const,
};

const specificScreenOptions: Partial<
  Record<AppScreenKey, Partial<NativeStackNavigationOptions>>
> = {
  [SCREEN_NAMES.SETTINGS]: {
    headerShown: false,
    animation: 'fade',
  },
};

export const getScreenOptions = (
  name: AppScreenKey,
): NativeStackNavigationOptions => ({
  ...defaultScreenOptions,
  ...specificScreenOptions[name],
});
