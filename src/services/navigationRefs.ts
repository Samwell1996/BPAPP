import type {
  NavigationContainerRefWithCurrent,
  NavigationProp,
} from '@react-navigation/native';

import type { RootStackParamList } from '@navigation/types';

/**
 * Internal reference store for top-level navigation
 * and imperatively called `.navigate` method.
 */
type NavigateType = NavigationProp<RootStackParamList>['navigate'];

const refs: {
  navigator: NavigationContainerRefWithCurrent<RootStackParamList> | null;
  navigate: NavigateType | null;
} = {
  navigator: null,
  navigate: null,
};

export default refs;
