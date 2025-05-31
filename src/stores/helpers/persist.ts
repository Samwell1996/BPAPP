import { reaction, toJS } from 'mobx';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export interface PersistConfig {
  [storeKey: string]: string[];
}

export class PersistService {
  constructor(
    private store: any,
    private config: PersistConfig,
  ) {}

  init() {
    for (const [storeKey, keys] of Object.entries(this.config)) {
      const storeInstance = this.store[storeKey];
      if (!storeInstance) {
        continue;
      }

      for (const key of keys) {
        const storedValue = storage.getString(`${storeKey}.${key}`);
        if (storedValue) {
          try {
            storeInstance[key] = JSON.parse(storedValue);
          } catch {}
        }

        reaction(
          () => toJS(storeInstance[key]),
          value => {
            storage.set(`${storeKey}.${key}`, JSON.stringify(value));
          },
        );
      }
    }
  }
}
