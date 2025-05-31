import { type IStyle } from 'react-native-theme-mk';

export type IPalette = 'black' | 'white' | 'red53' | 'transparent';

export type IColor =
  | 'white'
  | 'black'
  | 'primary'
  | 'backgroundSecondary'
  | 'text'
  | 'transparent';

export interface IThemeTextStyle {
  color: string;
  fontSize: number;
  lineHeight: number;
}

export type IShadow =
  | {
      shadowColor: string;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowRadius: number;
      shadowOpacity: number;
      elevation?: undefined;
    }
  | {
      elevation: number;
      shadowColor?: undefined;
      shadowOffset?: undefined;
      shadowRadius?: undefined;
      shadowOpacity?: undefined;
    }
  | undefined;

export type ITextStyleType = 'label';

export interface IBaseThemeSchema {
  radius: Record<'M' | 'L' | 'XL' | 'XXL', number>;
  colors: Record<IColor, string>;
  lineHeight: Record<
    | 'H1'
    | 'H2'
    | 'H3'
    | 'H4'
    | 'H5'
    | 'H6'
    | 'P1'
    | 'P2'
    | 'P3'
    | 'P4'
    | 'P5'
    | 'P6',
    number
  >;
  spacing: Record<
    'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL',
    number
  >;
  fontSize: Record<
    'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5',
    number
  >;
}
export type ITextStyle = Record<ITextStyleType, IThemeTextStyle>;
export type IElementStyle = Record<'header', IStyle>;
export type IPaletteStyle = Record<IPalette, string>;
export type IShadowStyle = Record<'light' | 'none', IShadow>;

export interface IThemeSchema extends IBaseThemeSchema {
  palette: IPaletteStyle;
  element: IElementStyle;
  text: ITextStyle;
  shadow: IShadowStyle;
}
