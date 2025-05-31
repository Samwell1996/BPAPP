import { type ITextStyle, type IBaseThemeSchema } from './types';

export const createTextStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): ITextStyle => ({
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.P5,
    lineHeight: theme.lineHeight.P5,
  },
});
