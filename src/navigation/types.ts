import { LINKING } from '@constants/linking';

type ExtractRouteParams<TPath extends string> =
  TPath extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<`/${Rest}`>
    : TPath extends `${string}:${infer Param}?/${infer Rest}`
      ? { [K in Param]?: string } & ExtractRouteParams<`/${Rest}`>
      : TPath extends `${string}:${infer Param}?`
        ? { [K in Param]?: string }
        : TPath extends `${string}:${infer Param}`
          ? { [K in Param]: string }
          : {};

type NormalizeEmpty<T> = keyof T extends never ? undefined : T;

export type RootStackParamList = {
  [K in keyof typeof LINKING]: NormalizeEmpty<
    ExtractRouteParams<(typeof LINKING)[K]>
  >;
};
