import type { Route } from '@react-navigation/native';

import type { RootStackParamList } from '@navigation/types';
import refs from '@services/navigationRefs';

export const captureNavigationChange = () => {
  const route: Route<keyof RootStackParamList> | undefined =
    refs.navigator?.getCurrentRoute();

  if (!route) {
    return;
  }

  const { name, params } = route;
  const message = JSON.stringify({
    name,
    params: params as RootStackParamList[typeof name],
  });

  // eslint-disable-next-line no-console
  console.log('Navigation Change', message);
};
