import { ThemeManager } from '@styles/theme';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
  },
  title: {
    ...theme.text.label,
    marginHorizontal: theme.spacing.M,
    marginVertical: theme.spacing.XS,
  },
}));
