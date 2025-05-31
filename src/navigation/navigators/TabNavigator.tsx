import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import { SCREEN_NAMES } from '@constants/navigation';
import { SCREENS_TAB } from '@navigation/screens';
import { ScreenKey } from '@navigation/types';
import { Device } from '@services/device';

import { createScreenEntries } from './utils';

const Tab = createBottomTabNavigator();
const tabScreens = createScreenEntries(SCREENS_TAB);

const screenTitle: Record<string, string> = {
  [SCREEN_NAMES.EXPLORE]: 'Explore',
  [SCREEN_NAMES.MARKETPLACE]: 'Marketplace',
  [SCREEN_NAMES.PROFILE]: 'Profile',
};
const ScreenIcon = ({ focused, name }: { focused: boolean; name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    [SCREEN_NAMES.EXPLORE]: (
      <View>
        <Text>{focused ? 'F' : ''}</Text>
      </View>
    ),
    [SCREEN_NAMES.MARKETPLACE]: <View />,
    [SCREEN_NAMES.PROFILE]: <View />,
  };

  return icons[name] || null;
};

const tabBarOptions = {
  headerTitle: '',
  tabBarAllowFontScaling: false,
  safeAreaInsets: {
    bottom: Device.inset.bottom,
  },
  tabBarStyle: {},
};

const getTabOptions = (name: ScreenKey) => ({
  ...tabBarOptions,
  //can be customized each
  //add other options
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <ScreenIcon focused={focused} name={name} />
  ),
  tabBarLabel: () => <Text>{screenTitle[name]}</Text>,
});

const TabsNavigator = () => (
  <Tab.Navigator>
    {tabScreens.map(([name, component]) => (
      <Tab.Screen
        key={name}
        name={name}
        component={component}
        options={getTabOptions(name)}
      />
    ))}
  </Tab.Navigator>
);

export default TabsNavigator;
