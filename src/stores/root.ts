import { makeAutoObservable } from 'mobx';

import { Api } from '@api';

import { viewerStore, ViewerStore } from './viewer';

export interface IRootStore {
  isInitialized: boolean;
  getStores(): {
    viewer: ViewerStore;
  };
  removeAllListeners(): void;
}

export class RootStore implements IRootStore {
  isInitialized = false;

  getStores = () => ({
    viewer: viewerStore,
  });

  get services() {
    return {};
  }

  get api() {
    return Api;
  }

  constructor() {
    makeAutoObservable(this);
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
