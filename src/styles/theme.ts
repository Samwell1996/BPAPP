import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';

import { themePrimary } from './primaryTheme';
import { type IThemeSchema } from './types';

export * from './types';
const theme: Record<string, IThemeSchema> = {
  primary: themePrimary,
};

export const ThemeManager = new ThemeManagerCreator('primary', theme);

export const { ThemeProvider, useTheme, useDevice, useScale } = ThemeManager;
