import { LINKING } from '@constants/linking';
import { APP_SCREENS_NAMES } from '@constants/navigation';

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never;
};

type ExtractRouteParams<T extends string | null | undefined> =
  T extends `${string}:${infer Param}?/${infer Rest}`
    ? Merge<{ [K in Param]?: string }, ExtractRouteParams<`/${Rest}`>>
    : T extends `${string}:${infer Param}/${infer Rest}`
      ? Merge<{ [K in Param]: string }, ExtractRouteParams<`/${Rest}`>>
      : T extends `${string}:${infer Param}?`
        ? { [K in Param]?: string }
        : T extends `${string}:${infer Param}`
          ? { [K in Param]: string }
          : {};

type NormalizeEmpty<T> = keyof T extends never ? undefined : T;
type ScreenName = (typeof APP_SCREENS_NAMES)[keyof typeof APP_SCREENS_NAMES];
type LinkingPath<S extends string> = S extends keyof typeof LINKING
  ? (typeof LINKING)[S] extends string
    ? (typeof LINKING)[S]
    : undefined
  : undefined;

export type RootStackParamList = {
  [S in ScreenName]: NormalizeEmpty<ExtractRouteParams<LinkingPath<S>>>;
};
