import withScreen from '@navigation/withScreen';

export const createScreenEntries = <
  T extends Record<string, { screen: React.ComponentType<any> }>,
>(
  screens: T,
): [keyof T, React.ComponentType<any>][] =>
  Object.entries(screens).map(
    ([name, { screen }]) =>
      [name, withScreen(screen)] as [keyof T, React.ComponentType<any>],
  );
