import { ModalKey } from '@navigation/types';

export const FAKE_NOTCH_HEIGHT = 56;
export const TOP_OFFSET_MODAL = 100;
export const DEFAULT_VERTICAL_OFFSET = 135;

export const SCREEN_NAMES_UNAUTHORIZED = {
  LOGIN: 'Login',
} as const;

export const SCREEN_NAMES = {
  PROFILE: 'Profile',
  MARKETPLACE: 'Marketplace',
  EXPLORE: 'Explore',

  SETTINGS: 'Settings',
} as const;

export const MODAL_NAMES = {
  FORGOT_PASSWORD: 'ForgotPassword',
  FILTERS: 'Filters',
  APP_UPDATE: 'AppUpdate',
} as const;

export const APP_SCREENS_NAMES = {
  ...SCREEN_NAMES_UNAUTHORIZED,
  ...SCREEN_NAMES,
  ...MODAL_NAMES,
} as const;

export const NAVIGATOR_NAMES = {
  MAIN_NAVIGATOR: 'MainNavigator',
  UN_AUTHORIZED_NAVIGATOR: 'UnAuthorizedNavigator',
  TAB_NAVIGATOR: 'TabNavigator',
} as const;

export const GESTURE_DISABLED_MODALS: Partial<Record<ModalKey, boolean>> = {
  [MODAL_NAMES.APP_UPDATE]: true,
};

/**
 * ManualParams is used to explicitly define `route.params` for screens
 * that either don't have parameters in the LINKING config or require
 * additional runtime parameters not included in the URL structure.
 *
 * ⚠️ Important:
 * For correct screen behavior, all parameters expected in `route.params`
 * must be declared here if they are not parsed from deep link paths.
 *
 * This ensures proper TypeScript validation when navigating between screens,
 * and enables accurate typing inside `useRoute`, `navigate`, and custom hooks.
 */
export type ManualParams = {
  [SCREEN_NAMES.EXPLORE]: { itemId: string };
};
