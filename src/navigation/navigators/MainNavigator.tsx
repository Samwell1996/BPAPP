import { memo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { NAVIGATOR_NAMES } from '@constants/navigation';
import { MODALS } from '@navigation/modals';
import { getDefaultModalOptions } from '@navigation/options/modalOptions';
import {
  screenStackScreenOptions,
  mainStackScreenOptions,
} from '@navigation/options/navigatorOptions';
import { getScreenOptions } from '@navigation/options/screenOptions';
import { SCREENS } from '@navigation/screens';
import { useStores } from '@stores/hooks/useStores';

import TabNavigator from './TabNavigator';
import UnAuthorizedNavigator from './UnAuthorizedNavigator';
import { createScreenEntries } from './utils';

const NativeStack = createNativeStackNavigator();

const modalsEntries = createScreenEntries(MODALS);
const screenEntries = createScreenEntries(SCREENS);

const MainNavigator = observer(() => {
  const {
    viewer: { isLoggedIn },
  } = useStores();

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
});

const MainStack = observer(() => (
  <NativeStack.Navigator screenOptions={mainStackScreenOptions}>
    <NativeStack.Screen
      name={NAVIGATOR_NAMES.MAIN_NAVIGATOR}
      component={MainNavigator}
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
));

export default memo(MainStack);
