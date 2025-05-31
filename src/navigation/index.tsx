import { ReactNode } from 'react';

import {
  NavigationContainer,
  LinkingOptions,
  DefaultTheme,
} from '@react-navigation/native';

import { LINKING } from '@constants/linking';
import MainStack from '@navigation/navigators/MainNavigator';
import {
  registerNavigationContainer,
  setTopLevelNavigator,
} from '@services/navigation';

import { RootStackParamList } from './types';

interface NavigationContainerWrapperProps {
  children?: ReactNode;
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: { screens: LINKING },
};

const NavigationContainerWrapper = ({
  children,
}: NavigationContainerWrapperProps) => (
  <NavigationContainer
    theme={DefaultTheme}
    linking={linking}
    ref={setTopLevelNavigator}
    onReady={registerNavigationContainer}
  >
    <MainStack />
    {children}
  </NavigationContainer>
);

export default NavigationContainerWrapper;
