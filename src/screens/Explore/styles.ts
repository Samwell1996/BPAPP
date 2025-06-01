import { ThemeManager } from '@styles/theme';

const POST_TILE_SIZE = 128;

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
  },
  tile: {
    height: POST_TILE_SIZE,
    flex: 1,
    backgroundColor: theme.colors.red53,
    marginHorizontal: theme.spacing.XXS,
    marginBottom: theme.spacing.XS,
    borderRadius: theme.spacing.XS,
    padding: theme.spacing.M,
    ...theme.element.center,
  },
  title: {
    ...theme.text.label,
  },
  listContainer: {
    marginHorizontal: theme.spacing.XXS,
  },
  footer: {
    marginVertical: theme.spacing.XS,
    ...theme.element.center,
  },
}));
