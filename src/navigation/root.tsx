import { ReactNode } from 'react';

import { NavigationContainer, LinkingOptions } from '@react-navigation/native';

import { LINKING } from '@constants/linking';

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
  <NavigationContainer linking={linking}>
    {/* <MainStack /> */}
    {children}
  </NavigationContainer>
);

export default NavigationContainerWrapper;
