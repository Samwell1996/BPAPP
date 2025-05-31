import { Api } from '@api';

import { RootStore } from '../root';

export const createRootStore = () =>
  new RootStore({
    api: Api,
  });
