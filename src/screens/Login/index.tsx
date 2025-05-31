import { useCallback } from 'react';

import Login from './Login';

const LoginContainer = () => {
  const onLogin = useCallback(() => {}, []);

  const props = {
    onLogin,
    isLoading: false,
  };

  return <Login {...props} />;
};

export default LoginContainer;
