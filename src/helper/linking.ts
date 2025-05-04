import { CUSTOM_LINKING } from '@constants/linking';
import { APP_SCREENS_NAMES } from '@constants/navigation';

export const generateLinking = () =>
  Object.fromEntries(
    Object.values(APP_SCREENS_NAMES).map(name => [
      name,
      CUSTOM_LINKING[name] ?? name.toLowerCase(),
    ]),
  ) as Record<string, string>;
