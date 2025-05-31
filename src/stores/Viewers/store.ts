import { makeAutoObservable } from 'mobx';

import { VIEWERS } from '@stores/schemas';
import { IUser } from '@stores/viewer';
import { uuidv4 } from '@utils/string';

import { UserModel } from './model';
import { ListStore } from '../helpers/createList';
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
  list: ListStore<UserModel>;

  constructor(private root: RootStore) {
    this.list = new ListStore<UserModel>({
      entityKey: VIEWERS,
      root,
    });

    makeAutoObservable(this);
  }

  fetchUsers = withDuck<[], void>(async _signal => {
    const users: IUser[] = Array.from({ length: 10 }, () => ({
      id: uuidv4(),
      name: randomName(),
    }));

    this.list.set(users);
  });
}
