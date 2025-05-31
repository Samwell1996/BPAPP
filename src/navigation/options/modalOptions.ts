import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { GESTURE_DISABLED_MODALS } from '@constants/navigation';
import { Device } from '@services/device';

import { ModalKey } from '../types';

export const getDefaultModalOptions = (
  screen: ModalKey,
): NativeStackNavigationOptions => ({
  gestureEnabled: !GESTURE_DISABLED_MODALS[screen],
  presentation: Device.isIOS ? 'modal' : 'transparentModal',
  animation: Device.isIOS ? 'slide_from_bottom' : 'fade',
  headerShown: false,
});
