import Config from 'react-native-config';

export const CONFIG = {
  IS_DEBUG: !!__DEV__,
  ENV: Config.ENV ?? 'UNKNOWN',
};
