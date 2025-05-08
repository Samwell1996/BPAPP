/* eslint-disable no-restricted-imports */
import { ReactNode } from 'react';

import {
  useNavigation,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';

import refs from '@services/navigationRefs';

import { isNestedScreen } from './utils';

/**
 * Internal helper that updates global navigation reference
 * for nested screens when they're focused.
 *
 * ⚠️ Do not use directly in screens or components.
 */
const NavigateRef = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  if (isFocused && isNestedScreen(route.name)) {
    if (refs.navigate !== navigation.navigate) {
      refs.navigate = navigation.navigate;
    }
  }

  return children;
};

export default NavigateRef;
