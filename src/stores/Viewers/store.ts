import { makeAutoObservable } from 'mobx';

import { IUser } from '@stores/viewer';
import { uuidv4 } from '@utils/string';

import { withDuck } from '../helpers/duck';
import type { RootStore } from '../root';

const randomName = () => {
  const names = [
    'Anna',
    'Ivan',
    'Olga',
    'Petro',
    'Nina',
    'Yurii',
    'Ira',
    'Dmytro',
    'Katya',
    'Taras',
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export class ViewersStore {
  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  fetchUsers = withDuck<[], void>(async _signal => {
    const users: IUser[] = Array.from({ length: 10 }, () => ({
      id: uuidv4(),
      name: randomName(),
    }));

    this.root.viewersList.set(users);
  });
}
