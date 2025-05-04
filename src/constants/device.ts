import { Platform } from 'react-native';

const globalAny = global as Record<string, unknown>;

export const IS_IOS: boolean = Platform.OS === 'ios';
export const IS_ANDROID: boolean = Platform.OS === 'android';

// flag used for while running unit testing
export const IS_TESTING: boolean = Platform.isTesting;

export const IS_FABRIC: boolean =
  !!globalAny.nativeFabricUIManager || !!globalAny._IS_FABRIC;
