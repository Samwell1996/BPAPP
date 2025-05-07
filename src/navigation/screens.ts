import { register } from 'react-native-bundle-splitter';

import { LINKING } from '@constants/linking';
import { SCREEN_NAMES, SCREEN_NAMES_UNAUTHORIZED } from '@constants/navigation';

export const SCREENS_TAB = {
  [SCREEN_NAMES.EXPLORE]: {
    screen: register({
      name: SCREEN_NAMES.EXPLORE,
      loader: () => import('@screens/Explore'),
    }),
  },
  [SCREEN_NAMES.MARKETPLACE]: {
    screen: register({
      name: SCREEN_NAMES.MARKETPLACE,
      loader: () => import('@screens/Marketplace'),
    }),
    path: LINKING[SCREEN_NAMES.MARKETPLACE],
  },
  [SCREEN_NAMES.PROFILE]: {
    screen: register({
      name: SCREEN_NAMES.PROFILE,
      loader: () => import('@screens/Profile'),
    }),
  },
};

export const SCREENS = {
  [SCREEN_NAMES.SETTINGS]: {
    screen: register({
      name: SCREEN_NAMES.SETTINGS,
      loader: () => import('@screens/Settings'),
    }),
  },
};

export const SCREENS_UNAUTHORIZED = {
  [SCREEN_NAMES_UNAUTHORIZED.LOGIN]: {
    screen: register({
      name: SCREEN_NAMES_UNAUTHORIZED.LOGIN,
      loader: () => import('@screens/Login'),
    }),
  },
};
