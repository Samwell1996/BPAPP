import { ComponentType } from 'react';

import withScreen from '@navigation/withScreen';

type ScreenEntry<T> = {
  [K in keyof T]: [
    K,
    T[K] extends { screen: ComponentType<infer P> } ? ComponentType<P> : never,
  ];
}[keyof T];

export const createScreenEntries = <
  T extends Record<string, { screen: ComponentType<any> }>,
>(
  screens: T,
): ScreenEntry<T>[] =>
  Object.entries(screens).map(
    ([name, { screen }]) => [name, withScreen(screen)] as ScreenEntry<T>,
  );
