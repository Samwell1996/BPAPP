import { useCallback, useContext, useEffect, useMemo } from 'react';

import {
  useNavigation as useNavigationV5,
  useIsFocused as useIsFocusedV5,
  NavigationProp,
} from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import { preload } from 'react-native-bundle-splitter';

import type { RootStackParamList } from '@navigation/types';
import refs from '@services/navigationRefs';
import { RouteObjectContext } from 'src/navigation/withScreen/RouteObject';
import { useRouteParamsSelector } from 'src/navigation/withScreen/RouteParams';

type NavigateFn = NavigationProp<RootStackParamList>['navigate'];

export const useNavigation = () => {
  const navigation = useNavigationV5<NavigationProp<RootStackParamList>>();

  const navigate: NavigateFn = useCallback(
    (route: any, params?: any) => {
      const navigate = refs.navigate || navigation.navigate;

      return !!params || typeof route === 'string'
        ? navigate(route, params)
        : navigate({ ...route, name: route.routeName });
    },
    [navigation],
  );

  return { ...navigation, navigate };
};

export const useIsFocused = useIsFocusedV5;
export const useRouteName = () => useContext(RouteObjectContext)?.name;
export const useRouteKey = () => useContext(RouteObjectContext)?.key;
export const useRabbitHoleKey = () =>
  useContext(RouteObjectContext)?.rabbitHoleKey;

export const useNavigationParam = <
  K extends keyof RootStackParamList[keyof RootStackParamList],
>(
  paramName: K,
  defaultValue: RootStackParamList[keyof RootStackParamList][K],
) =>
  useRouteParamsSelector(params =>
    params && paramName in params ? params[paramName] : defaultValue,
  );

export const usePreviousRouteNameInStack = () =>
  useContext(RouteObjectContext)?.previousRouteNameInStack;

export const usePreload = (screenNames: string[]) => {
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      const bundlePreload = preload();

      screenNames.forEach(bundlePreload.component);
    });

    return () => {
      interactionPromise?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useFocusedValue = (value: any) => {
  const isFocused = useIsFocused();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const snapshot = useMemo(() => value, [isFocused]);

  return isFocused ? value : snapshot;
};
