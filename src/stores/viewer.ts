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

  setUser = withDuck(async user => {
    try {
      this.user = user;
    } catch {
      this.user = null;
    }
  });

  setIsLoggedIn = withDuck(async isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
  });
}
