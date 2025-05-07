import { memo } from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { IS_IOS } from '@constants/device';
import {
  NAVIGATOR_NAMES,
  GESTURE_DISABLED_MODALS,
} from '@constants/navigation';
import { MODALS } from '@navigation/modals';
import { SCREENS } from '@navigation/screens';
import withScreen from '@navigation/withScreen';

import { screenStackScreenOptions } from '../stackOptions';
import { ModalKey } from '../types';
import { getScreenOptions } from './options';
import TabNavigator from './TabNavigator';
import UnAuthorizedNavigator from './UnAuthorizedNavigator';
import { createScreenEntries } from './utils';

const NativeStack = createNativeStackNavigator();

const modalsEntries: [ModalKey, React.ComponentType<any>][] = Object.entries(
  MODALS,
).map(([name, component]) => [name as ModalKey, withScreen(component)]);

const screenEntries = createScreenEntries(SCREENS);

const getDefaultModalOptions = (
  screen: ModalKey,
): NativeStackNavigationOptions => ({
  gestureEnabled: !GESTURE_DISABLED_MODALS[screen],
  presentation: IS_IOS ? 'modal' : 'transparentModal',
  animation: IS_IOS ? 'slide_from_bottom' : 'fade',
  headerShown: false,
});

const mainStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: IS_IOS ? 'default' : 'fade',
  presentation: IS_IOS ? 'modal' : 'transparentModal',
};

const MainNavigator = () => {
  //TODO:: from store should be
  const isLoggedIn = true;

  return (
    <NativeStack.Navigator
      initialRouteName={
        !isLoggedIn
          ? NAVIGATOR_NAMES.UN_AUTHORIZED_NAVIGATOR
          : NAVIGATOR_NAMES.TAB_NAVIGATOR
      }
      screenOptions={screenStackScreenOptions}
    >
      {!isLoggedIn ? (
        <NativeStack.Screen
          name={NAVIGATOR_NAMES.UN_AUTHORIZED_NAVIGATOR}
          component={UnAuthorizedNavigator}
        />
      ) : (
        <>
          <NativeStack.Screen
            name={NAVIGATOR_NAMES.TAB_NAVIGATOR}
            component={TabNavigator}
          />
          {screenEntries.map(([name, component]) => (
            <NativeStack.Screen
              key={name}
              name={name}
              component={component}
              options={getScreenOptions(name)}
            />
          ))}
        </>
      )}
    </NativeStack.Navigator>
  );
};

const MainNavigatorStack = withScreen(MainNavigator);

const MainStack = () => (
  <NativeStack.Navigator screenOptions={mainStackScreenOptions}>
    <NativeStack.Screen
      name={NAVIGATOR_NAMES.MAIN_NAVIGATOR}
      component={MainNavigatorStack}
    />
    {modalsEntries.map(([name, component]) => (
      <NativeStack.Screen
        key={name}
        name={name}
        component={component}
        options={getDefaultModalOptions(name)}
      />
    ))}
  </NativeStack.Navigator>
);

export default memo(MainStack);
