import { makeAutoObservable } from 'mobx';

import { withDuck } from './helpers/duck';
import type { RootStore } from './root';

export interface IUser {
  id: string;
  name: string;
}

export class ViewerStore {
  isLoggedIn = false;
  user: IUser | null = null;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  get isLoadingIn() {
    return this.isLoggedIn;
  }

  setUser = withDuck<[IUser | null], void>(async (user, _signal) => {
    this.user = user;
  });

  setIsLoggedIn = withDuck<[boolean], void>(async (isLoggedIn, _signal) => {
    this.isLoggedIn = isLoggedIn;
  });
}
