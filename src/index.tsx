import { observer } from 'mobx-react-lite';
import { startNetworkLogging } from 'react-native-network-logger';

import NavigationContainer from '@navigation/index';
import { AppStateProvider } from '@services/appState';
import reactotron from '@services/reactotron';
import { StoresContext } from '@stores/hooks/useStores';
import { stores } from '@stores/index';
import { ThemeProvider } from '@styles/theme';

if (__DEV__) {
  reactotron();
} else {
  startNetworkLogging();
}

//TODO:: add portal for modals in fade in modal ?
const App = () => (
  <AppStateProvider>
    <ThemeProvider>
      <StoresContext.Provider value={stores}>
        <NavigationContainer />
      </StoresContext.Provider>
    </ThemeProvider>
  </AppStateProvider>
);

export default observer(App);
