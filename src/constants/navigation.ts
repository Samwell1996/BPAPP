export const SCREEN_NAMES = {
  PROFILE: 'Profile',
  LOGIN: 'Login',
  MARKETPLACE: 'Marketplace',
  EXPLORE: 'Explore',
} as const;

export const MODAL_NAMES = {
  FORGOT_PASSWORD: 'ForgotPassword',
} as const;

export const APP_SCREENS_NAMES = {
  ...SCREEN_NAMES,
  ...MODAL_NAMES,
} as const;
