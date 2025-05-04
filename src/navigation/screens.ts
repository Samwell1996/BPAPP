import { register } from 'react-native-bundle-splitter';

import { LINKING } from '@constants/linking';
import { SCREEN_NAMES } from '@constants/navigation';

const Screens = {
  [SCREEN_NAMES.PROFILE]: {
    screen: register({
      name: SCREEN_NAMES.PROFILE,
      loader: () => import('@screens/Profile'),
    }),
  },
  [SCREEN_NAMES.MARKETPLACE]: {
    screen: register({
      name: SCREEN_NAMES.MARKETPLACE,
      loader: () => import('@screens/Marketplace'),
    }),
    path: LINKING[SCREEN_NAMES.MARKETPLACE],
  },
  [SCREEN_NAMES.LOGIN]: {
    screen: register({
      name: SCREEN_NAMES.LOGIN,
      loader: () => import('@screens/Login'),
    }),
  },
  [SCREEN_NAMES.EXPLORE]: {
    screen: register({
      name: SCREEN_NAMES.EXPLORE,
      loader: () => import('@screens/Explore'),
    }),
  },
};

export default Screens;
