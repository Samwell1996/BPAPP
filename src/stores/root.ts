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
  removeAllListeners(): void;
}

export class RootStore implements IRootStore {
  auth: AuthStore;
  viewer: ViewerStore;

  private persist: PersistService;

  isInitialized = false;

  constructor() {
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

  get services() {
    return {};
  }

  get api() {
    return Api;
  }

  setInitialized(value: boolean) {
    this.isInitialized = value;
  }

  removeAllListeners() {
    /**
     * Remove all listeners
     */
  }
}
