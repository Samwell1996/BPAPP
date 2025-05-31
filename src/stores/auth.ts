import { makeAutoObservable } from 'mobx';

import { uuidv4 } from '@utils/string';

import { withDuck } from './helpers/duck';
import type { RootStore } from './root';

export class AuthStore {
  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  login = withDuck(async () => {
    const user = {
      id: uuidv4(),
      name: 'Guest',
    };

    this.root.viewer.setUser.run(user);
    this.root.viewer.setIsLoggedIn.run(true);
  });

  logout = withDuck(async () => {
    this.root.viewer.setIsLoggedIn.run(false);
    this.root.viewer.setUser.run(null);
  });
}
