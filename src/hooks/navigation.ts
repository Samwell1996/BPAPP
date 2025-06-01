import { useCallback, useContext, useEffect, useMemo } from 'react';

import {
  // eslint-disable-next-line no-restricted-imports
  useNavigation as useNavigationV5,
  useIsFocused as useIsFocusedV5,
  NavigationProp,
} from '@react-navigation/native';
import { InteractionManager } from 'react-native';
import { preload } from 'react-native-bundle-splitter';

import type { RootStackParamList } from '@navigation/types';
import { RouteObjectContext } from '@navigation/withScreen/RouteObject';
import { useRouteParamsSelector } from '@navigation/withScreen/RouteParams';
import refs from '@services/navigationRefs';

type NavigateFn = <T extends keyof RootStackParamList>(
  screen: T,
  params?: RootStackParamList[T],
) => void;

/**
 * useNavigation
 *
 * A wrapper around useNavigation that provides a custom, strongly-typed `navigate` function.
 *
 * 🚨 To use navigation with screen params, you must explicitly define them in `ManualParams`.
 *
 * @example src/constants/navigation
 *
 * type ManualParams = {
 *   [SCREEN_NAMES.EXPLORE]: { itemId: string };
 *   [SCREEN_NAMES.SETTINGS]: { userId: string }; // <-- Add new screens here
 * };
 *
 * @example
 * const { navigate } = useNavigation();
 * navigate(SCREEN_NAMES.EXPLORE, { itemId: '123' }); // ✅ Fully typed
 *
 * @error
 * If a screen is not listed in `ManualParams`, TypeScript will raise an error like:
 * Argument of type '"SETTINGS"' is not assignable to parameter of type ...
 *
 * This ensures all navigation routes with parameters are explicitly defined and type-safe.
 */
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

export const useNavigationParam = <T = any>(key: string, fallback: T): T =>
  useRouteParamsSelector(params => (params?.[key] ?? fallback) as T);

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
  }, []);
};

export const useFocusedValue = (value: any) => {
  const isFocused = useIsFocused();

  const snapshot = useMemo(() => value, [isFocused]);

  return isFocused ? value : snapshot;
};
