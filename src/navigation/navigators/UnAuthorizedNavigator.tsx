import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREEN_NAMES_UNAUTHORIZED } from '@constants/navigation';
import { SCREENS_UNAUTHORIZED } from '@navigation/screens';
import withScreen from '@navigation/withScreen';

import { screenStackScreenOptions } from '../stackOptions';
import { createScreenEntries } from './utils';

const NativeStack = createNativeStackNavigator();

const screenEntriesUnAuthorized = createScreenEntries(SCREENS_UNAUTHORIZED);

const UnAuthorizedNavigator = () => (
  <NativeStack.Navigator
    initialRouteName={SCREEN_NAMES_UNAUTHORIZED.LOGIN}
    screenOptions={screenStackScreenOptions}
  >
    {screenEntriesUnAuthorized.map(([name, component]) => (
      <NativeStack.Screen key={name} name={name} component={component} />
    ))}
  </NativeStack.Navigator>
);

export default withScreen(UnAuthorizedNavigator);
