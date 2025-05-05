import { View } from 'react-native';
import { startNetworkLogging } from 'react-native-network-logger';

import { AppStateProvider } from '@services/appState';
import reactotron from '@services/reactotron';

if (__DEV__) {
  reactotron();
} else {
  startNetworkLogging();
}

const App = () => (
  <AppStateProvider>
    <View style={{ backgroundColor: 'red', flex: 1 }} />
  </AppStateProvider>
);

export default App;
