import { makeAutoObservable } from 'mobx';

import { Api } from '@api';

import { AuthStore } from './auth';
import { PersistConfig, PersistService } from './helpers/persist';
import { ViewerStore } from './viewer';

export interface IRootStore {
  isInitialized: boolean;
  getStores(): {
    viewer: ViewerStore;
    auth: AuthStore;
  };
}

type RootStoreDeps = {
  api: typeof Api;
};

export class RootStore implements IRootStore {
  auth: AuthStore;
  viewer: ViewerStore;

  private persist: PersistService<RootStore>;

  isInitialized = false;

  constructor(private deps: RootStoreDeps) {
    this.auth = new AuthStore(this);
    this.viewer = new ViewerStore(this);

    makeAutoObservable(this);

    const persistConfig: PersistConfig = {
      viewer: ['user', 'isLoggedIn'],
    };

    this.persist = new PersistService(this, persistConfig);
    this.persist.init();
  }

  getStores = () => ({
    viewer: this.viewer,
    auth: this.auth,
  });

  get api() {
    return this.deps.api;
  }

  setInitialized(value: boolean) {
    this.isInitialized = value;
  }
}
