import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Device } from '@services/device';

export const screenStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: {
    paddingTop: Device.inset.top,
    paddingBottom: Device.inset.bottom,
  },
};

export const screenStackUnAuthorizedScreenOptions: NativeStackNavigationOptions =
  {
    headerShown: false,
    animation: 'slide_from_right',
  };

export const mainStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: Device.isIOS ? 'default' : 'fade',
  presentation: Device.isIOS ? 'modal' : 'transparentModal',
  contentStyle: { backgroundColor: 'transparent' },
};
