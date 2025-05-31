import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
}
export class ViewerStore {
  isLoggedIn = false;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login() {
    try {
      this.user = {
        id: uuidv4(),
        name: 'Guest',
      };

      this.isLoggedIn = true;
    } catch (e) {
      this.user = null;
      this.isLoggedIn = false;

      throw e;
    }
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
  }
}

export const viewerStore = new ViewerStore();
