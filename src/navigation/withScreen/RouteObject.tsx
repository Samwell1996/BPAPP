import { useMemo, createContext, useRef, useCallback } from 'react';

import {
  useRoute,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { RouteProp, NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/types';

import { RouteObjectContextValue, RouteObjectProps } from './types';

export const RouteObjectContext = createContext<RouteObjectContextValue | null>(
  null,
);

/**
 * Recursively merges multiple navigation states by combining their route arrays.
 * This simulates a deep merge but only for `routes` — useful when handling nested navigators.
 *
 * @param states - A list of partial navigation states to merge
 * @returns A single merged navigation state object
 */
const mergeStatesRecursively = (...states: any[]): any => {
  const merged = { ...states[0] };
  for (let i = 1; i < states.length; i++) {
    merged.routes = [...(merged.routes ?? []), ...(states[i]?.routes ?? [])];
  }
  return merged;
};

/**
 * Traverses the nested route structure to extract the name of the deepest (active) route.
 * This handles nested stacks, tabs, and any embedded state structures.
 *
 * @param route - A single route object that may contain nested `state.routes`
 * @returns The name of the deepest active route, or undefined if not found
 */
const getDeepestRouteName = (route: any): string | undefined => {
  let current = route;
  while (current?.state?.routes && typeof current?.state?.index === 'number') {
    current = current.state.routes[current.state.index];
  }
  return current?.name;
};

/**
 * Retrieves the name of the previous route in the navigation stack, including support
 * for nested navigators. Automatically merges parent navigation state if inside a tab.
 *
 * @param navState - The current navigation state from `useNavigationState`
 * @param prevNavigation - The current navigation object from `useNavigation`
 * @returns The name of the previous screen (deepest nested), or undefined if not found
 */
const getPreviousRouteName = (
  navState: any,
  prevNavigation: any,
): string | undefined => {
  const parentState = prevNavigation?.getParent?.()?.getState?.();
  const isNested = !!parentState && navState?.type === 'tab';

  const finalNavState = isNested
    ? mergeStatesRecursively(parentState, navState)
    : navState;

  const previousRoute = finalNavState?.routes?.at?.(-2);
  return getDeepestRouteName(previousRoute);
};

/**
 * Memoized selector that returns the same result after first calculation.
 * Useful for expensive selectors inside navigation state hooks.
 *
 * @template S - Navigation state
 * @template R - Returned value
 * @param selector - Function to select a value from navigation state
 * @param prevNavigation - Optional reference object (e.g., navigation)
 * @returns Memoized selector result
 */
const useOneTimeSelector = <S, R>(
  selector: (state: S, prevNavigation: any) => R,
  prevNavigation: any,
): ((state: S) => R | null) => {
  const valueRef = useRef<R | null>(null);
  const foundRef = useRef(false);

  return useCallback(
    (state: S) => {
      if (foundRef.current) {
        return valueRef.current;
      }
      const value = selector(state, prevNavigation);
      foundRef.current = true;
      valueRef.current = value;
      return value || null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selector],
  );
};

/**
 * Provides contextual route metadata such as name, key,
 * previous route in stack, and any custom params.
 *
 * This component optimizes performance by preventing rerenders
 * when route.params change.
 */
const RouteObject = ({ children, params }: RouteObjectProps) => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const selectPreviousRouteName = useOneTimeSelector(
    getPreviousRouteName,
    navigation,
  );
  const previousRouteNameInStack = useNavigationState(selectPreviousRouteName);

  const value = useMemo(
    () => ({
      name: route.name,
      key: route.key,
      rabbitHoleKey: `${Date.now()}`,
      previousRouteNameInStack: previousRouteNameInStack as string | undefined,
      ...params,
    }),
    [route.name, route.key, previousRouteNameInStack, params],
  );
  return (
    <RouteObjectContext.Provider value={value}>
      {children}
    </RouteObjectContext.Provider>
  );
};

export default RouteObject;
