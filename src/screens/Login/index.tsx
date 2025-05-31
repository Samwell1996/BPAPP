import { useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { useStores } from '@stores/hooks/useStores';

import Login from './Login';

const LoginContainer = () => {
  const {
    auth: { login },
  } = useStores();

  const onLogin = useCallback(() => {
    login.run();
  }, []);

  const props = {
    onLogin,
    isLoading: login.isLoading,
  };

  return <Login {...props} />;
};

export default observer(LoginContainer);
