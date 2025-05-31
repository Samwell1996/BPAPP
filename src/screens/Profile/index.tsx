import { useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { useStores } from '@stores/hooks/useStores';

import Profile from './Profile';

const ProfileContainer = () => {
  const {
    auth: { logout },
    viewers: { fetchUsers },
  } = useStores();

  const onLogout = useCallback(() => {
    logout.run();
  }, []);

  const addUsers = useCallback(() => {
    fetchUsers.run();
  }, []);

  const props = {
    onLogout,
    addUsers,
    isLoading: logout.isLoading,
  };

  return <Profile {...props} />;
};

export default observer(ProfileContainer);
