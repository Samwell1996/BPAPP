import { SCREEN_NAMES } from '@constants/navigation';
import { generateLinking } from 'src/helper/linking';

export const CUSTOM_LINKING: Partial<Record<string, string>> = {
  [SCREEN_NAMES.MARKETPLACE]: 'marketplace/:itemId?',
};

export const LINKING = generateLinking();
