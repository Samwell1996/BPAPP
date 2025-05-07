import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const globalAny = global as Record<string, unknown>;

export const IS_IOS: boolean = Platform.OS === 'ios';
export const IS_ANDROID: boolean = Platform.OS === 'android';

// flag used for while running unit testing
export const IS_TESTING: boolean = Platform.isTesting;

export const IS_FABRIC: boolean =
  !!globalAny.nativeFabricUIManager || !!globalAny._IS_FABRIC;

export const screenWidth = width < height ? width : height;
export const screenHeight = width < height ? height : width;
