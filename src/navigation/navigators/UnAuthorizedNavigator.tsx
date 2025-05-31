import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREEN_NAMES_UNAUTHORIZED } from '@constants/navigation';
import { screenStackUnAuthorizedScreenOptions } from '@navigation/options/navigatorOptions';
import { SCREENS_UNAUTHORIZED } from '@navigation/screens';

import { createScreenEntries } from './utils';

const NativeStack = createNativeStackNavigator();

const screenEntriesUnAuthorized = createScreenEntries(SCREENS_UNAUTHORIZED);

const UnAuthorizedNavigator = () => (
  <NativeStack.Navigator
    initialRouteName={SCREEN_NAMES_UNAUTHORIZED.LOGIN}
    screenOptions={screenStackUnAuthorizedScreenOptions}
  >
    {screenEntriesUnAuthorized.map(([name, component]) => (
      <NativeStack.Screen key={name} name={name} component={component} />
    ))}
  </NativeStack.Navigator>
);

export default UnAuthorizedNavigator;
