import { type IElementStyle } from './types';

export const createElementsStyles = (): IElementStyle => ({
  header: {
    height: 52,
  },
  button: {
    height: 48,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
