import { ThemeManager } from '@styles/theme';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 16,
    ...theme.element.center,
    ...theme.element.button,
  },
  textButton: {
    ...theme.text.label,
  },
}));
