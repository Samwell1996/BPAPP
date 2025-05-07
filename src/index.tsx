import { startNetworkLogging } from 'react-native-network-logger';

import NavigationContainer from '@navigation/index';
import { AppStateProvider } from '@services/appState';
import reactotron from '@services/reactotron';

if (__DEV__) {
  reactotron();
} else {
  startNetworkLogging();
}

//TODO:: add portal for modals in fade in modal ?
const App = () => (
  <AppStateProvider>
    <NavigationContainer />
  </AppStateProvider>
);

export default App;
