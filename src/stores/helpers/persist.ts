import { reaction, toJS } from 'mobx';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export interface PersistConfig {
  [storeKey: string]: string[];
}

export class PersistService<TStore extends Record<string, any>> {
  constructor(
    private store: TStore,
    private config: PersistConfig,
  ) {}

  init() {
    for (const [storeKey, keys] of Object.entries(this.config)) {
      const storeInstance = this.store[storeKey];
      if (!storeInstance) {
        continue;
      }

      for (const key of keys) {
        const storageKey = `${storeKey}.${key}`;

        // Entity-style API
        if (
          typeof storeInstance.getSnapshotForKey === 'function' &&
          typeof storeInstance.restoreSnapshotForKey === 'function'
        ) {
          const saved = storage.getString(storageKey);
          if (saved) {
            try {
              storeInstance.restoreSnapshotForKey(key, JSON.parse(saved));
            } catch (e) {
              console.warn(`Restore failed for ${storageKey}`, e);
            }
          }
          continue;
        }

        // Standard snapshotable object
        const target = storeInstance[key];
        const isSnapshotable =
          target &&
          typeof target.getSnapshot === 'function' &&
          typeof target.restoreFromSnapshot === 'function';

        const getValue = () =>
          toJS(isSnapshotable ? target.getSnapshot() : target);

        const stored = storage.getString(storageKey);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            isSnapshotable
              ? target.restoreFromSnapshot(parsed)
              : (storeInstance[key] = parsed);
          } catch (err) {
            console.warn(`Restore failed for ${storageKey}`, err);
          }
        }

        reaction(getValue, value => {
          try {
            const json = JSON.stringify(value);
            storage.set(storageKey, json);
          } catch (err) {
            console.warn(`Persist failed for ${storageKey}`, err);
          }
        });
      }
    }
  }

  persistEntitiesKey(key: string) {
    try {
      const snapshot = this.store.entities?.getSnapshotForKey?.(key);
      if (!snapshot) {
        return;
      }
      storage.set(`entities.${key}`, JSON.stringify(snapshot));
    } catch (err) {
      console.warn(`Manual persist failed for entities.${key}`, err);
    }
  }

  clear() {
    Object.entries(this.config).forEach(([storeKey, keys]) => {
      const storeInstance = this.store[storeKey];
      if (!storeInstance) {
        return;
      }

      keys.forEach(key => {
        storage.delete(`${storeKey}.${key}`);

        if (typeof storeInstance.restoreSnapshotForKey === 'function') {
          storeInstance.restoreSnapshotForKey(key, {});
        } else {
          storeInstance[key] = null;
        }
      });
    });
  }
}
