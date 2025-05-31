import { ThemeManager } from '@styles/theme';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  button: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 16,
    ...theme.element.center,
    ...theme.element.button,
    marginVertical: theme.spacing.XS,
  },
  textButton: {
    ...theme.text.label,
  },
}));
