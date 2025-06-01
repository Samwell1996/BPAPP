import { makeAutoObservable } from 'mobx';

export class EntitiesStore {
  [key: string]: any;

  constructor(private persistFn?: (key: string) => void) {
    makeAutoObservable(this, {
      persistFn: false,
    });
  }

  merge(newEntities: Record<string, Record<string | number, any>>) {
    for (const [entityKey, items] of Object.entries(newEntities)) {
      if (!this[entityKey]) {
        this[entityKey] = {};
      }

      Object.assign(this[entityKey], items);
      this.persistFn?.(entityKey);
    }
  }

  getEntity<T>(entityKey: string, id: string | number): T | undefined {
    return this[entityKey]?.[id];
  }

  getAll<T>(entityKey: string): T[] {
    return Object.values(this[entityKey] || {});
  }

  getSnapshotForKey(key: string): Record<string | number, any> | undefined {
    const value = this[key];
    return typeof value === 'object' && value ? { ...value } : undefined;
  }

  restoreSnapshotForKey(key: string, data: Record<string | number, any>) {
    if (!data || typeof data !== 'object') {
      return;
    }
    if (!this[key]) {
      this[key] = {};
    }
    for (const [id, value] of Object.entries(data)) {
      if (id !== 'undefined') {
        this[key][id] = value;
      } else {
        console.warn(`Skipped invalid ID while restoring ${key}`, value);
      }
    }
  }

  reset() {
    for (const key of Object.keys(this)) {
      if (typeof this[key] === 'object') {
        this[key] = {};
      }
    }
  }
}
