import { makeAutoObservable } from 'mobx';

export class EntitiesStore {
  private data: Record<string, Record<string | number, any>> = {};

  constructor() {
    makeAutoObservable(this);
  }

  merge(newEntities: Record<string, Record<string | number, any>>) {
    for (const [entityKey, items] of Object.entries(newEntities)) {
      if (!this.data[entityKey]) {
        this.data[entityKey] = {};
      }
      Object.assign(this.data[entityKey], items);
    }
  }

  getEntity<T>(entityKey: string, id: string | number): T | undefined {
    return this.data[entityKey]?.[id];
  }

  getAll<T>(entityKey: string): T[] {
    return Object.values(this.data[entityKey] || {});
  }

  get entities() {
    return this.data;
  }
}
