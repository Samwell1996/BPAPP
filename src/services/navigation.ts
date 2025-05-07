import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';

import type { RootStackParamList } from '@navigation/types';
import refs from '@services/navigationRefs';

export function setTopLevelNavigator(
  navigatorRef: NavigationContainerRefWithCurrent<RootStackParamList> | null,
) {
  refs.navigator = navigatorRef;
}

//TODO:: REGISTER NAVIGATION FOR SENTRY WITH && registerNavigationContainer(refs.navigator)
export function registerNavigationContainer() {
  !!refs.navigator;
}
