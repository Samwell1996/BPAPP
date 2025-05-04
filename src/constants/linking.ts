import { SCREEN_NAMES } from '@constants/navigation';

export const LINKING = {
  [SCREEN_NAMES.MARKETPLACE]: 'marketplace/:itemId?',
} as const satisfies Record<string, string | null>;
