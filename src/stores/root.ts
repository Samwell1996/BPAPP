import { makeAutoObservable } from 'mobx';

import { Api } from '@api';

import { AuthStore } from './Auth/store';
import { EntitiesStore } from './helpers/entities';
import { PersistConfig, PersistService } from './helpers/persist';
import { ViewerStore } from './Viewer/store';
import { ViewersStore } from './Viewers/store';

export interface IRootStore {
  isInitialized: boolean;
}

type RootStoreDeps = {
  api: typeof Api;
};

export class RootStore implements IRootStore {
  entities: EntitiesStore;

  auth: AuthStore;
  viewer: ViewerStore;

  viewers: ViewersStore;

  private persist: PersistService<RootStore>;

  isInitialized = false;

  constructor(private deps: RootStoreDeps) {
    this.entities = new EntitiesStore();

    this.auth = new AuthStore(this);
    this.viewer = new ViewerStore(this);
    this.viewers = new ViewersStore(this);

    makeAutoObservable(this);

    const persistConfig: PersistConfig = {
      viewer: ['user', 'isLoggedIn'],
    };

    this.persist = new PersistService(this, persistConfig);
    this.persist.init();
  }

  get api() {
    return this.deps.api;
  }

  setInitialized(value: boolean) {
    this.isInitialized = value;
  }
}
