import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { SCREEN_NAMES } from '@constants/navigation';
import type { ScreenKey } from '@navigation/types';

const defaultScreenOptions = {
  headerShown: true,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: 'default' as const,
  presentation: 'card' as const,
};

const specificScreenOptions: Partial<
  Record<ScreenKey, Partial<NativeStackNavigationOptions>>
> = {
  [SCREEN_NAMES.SETTINGS]: {
    headerShown: false,
    animation: 'fade',
  },
};

export const getScreenOptions = (
  name: ScreenKey,
): NativeStackNavigationOptions => ({
  ...defaultScreenOptions,
  ...specificScreenOptions[name],
});
