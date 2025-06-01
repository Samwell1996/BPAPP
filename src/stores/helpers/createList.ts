import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { RootStore } from '@stores/root';

import { normalize } from './normalize';

interface ListStoreOptions<T> {
  entityKey: string;
  root: RootStore;
  pageSize?: number;
  limit?: number;
  reversed?: boolean;
  hasNoMore?: boolean;
  idAttribute?: keyof T;
}

interface ListSnapshot<T> {
  items: (string | number)[];
  pageSize: number;
  limit: number;
  reversed: boolean;
  idAttribute: keyof T;
}

export class ListStore<T extends { id: string | number }> {
  private items: (string | number)[];
  private pageSize: number;
  private entityKey: string;
  private reversed: boolean;
  private root: RootStore;
  private idAttribute: keyof T = 'id' as keyof T;
  public limit: number;
  public hasNoMore: boolean;
  public isHydrated: boolean;

  constructor(options: ListStoreOptions<T>) {
    this.items = [];
    this.entityKey = options.entityKey;
    this.root = options.root;
    this.pageSize = options.pageSize ?? 10;
    this.limit = options.limit ?? 10;
    this.isHydrated = false;
    this.reversed = options.reversed ?? false;
    this.hasNoMore = options.hasNoMore ?? false;
    this.idAttribute = options.idAttribute ?? 'id';
    makeAutoObservable(this);
  }

  private _processData(data: T[]) {
    const { entities, result } = normalize(data, this.entityKey);
    this.root.entities.merge(entities);
    return result;
  }

  get asArray() {
    return this.items.slice();
  }

  get first() {
    return this.items[0];
  }

  get last() {
    return this.items[this.count - 1];
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  get count(): number {
    return this.items.length;
  }

  get pageNumber() {
    return Math.floor(this.count / this.limit) + 1;
  }

  get offset(): number {
    const pages = this.count / (this.pageSize || this.limit) + 1;
    const countOffset = (pages - 1) * (this.pageSize || this.limit);

    if (Number.isInteger(countOffset)) {
      return countOffset;
    }

    return 0;
  }

  get getList(): T[] {
    return this.items
      .map(id => this.root.entities.getEntity<T>(this.entityKey, id))
      .filter((item): item is T => !!item);
  }

  push(data: T[]) {
    const ids = this._processData(data);

    runInAction(() => {
      if (this.reversed) {
        this.items.push(...ids);
      } else {
        this.items.unshift(...ids);
      }
    });
  }

  unshift(data: T[]) {
    const ids = this._processData(data);
    runInAction(() => {
      if (!this.reversed) {
        this.items.unshift(...ids);
      } else {
        this.items.push(...ids);
      }
    });
  }

  checkIfHasMore(data: T[]) {
    if (
      (typeof this.pageSize !== 'undefined' && data.length < this.pageSize) ||
      (typeof this.limit !== 'undefined' && data.length < this.limit)
    ) {
      this.hasNoMore = true;
    }
  }

  set(data: T[]) {
    const ids = this._processData(data);
    this.items = this.reversed ? ids.reverse() : ids;
    this.checkIfHasMore(data);
  }

  add(item: T) {
    const result = this._processData([item]);

    runInAction(() => {
      const ids = Array.isArray(result) ? result : [result];

      if (this.reversed) {
        this.items.push(...ids);
      } else {
        this.items.unshift(...ids);
      }
    });
  }

  append(items: T[]) {
    const ids = this._processData(items);

    runInAction(() => {
      this.items.push(...ids);
    });

    this.checkIfHasMore(items);
  }

  reset() {
    this.items = [];
    this.pageSize = 10;
    this.limit = 10;
    this.reversed = false;
    this.hasNoMore = false;
    this.isHydrated = false;
    this.idAttribute = 'id' as keyof T;
  }

  findIndexById(id: string | number) {
    return this.items.findIndex(itemId => itemId === id);
  }

  removeById(id: string | number) {
    const index = this.findIndexById(id);

    if (index < 0) {
      return;
    }

    this.items.splice(index, 1);
  }

  byIndex(index: number) {
    return this.items[index];
  }

  includes(item: T): boolean {
    const id = item[this.idAttribute];

    if (typeof id !== 'string' && typeof id !== 'number') {
      return false;
    }

    return this.items.includes(id);
  }

  findIndex(element: T): number {
    const id = element[this.idAttribute];
    return this.items.findIndex(itemId => itemId === id);
  }

  findById(id: string | number): T | undefined {
    return this.root.entities.getEntity<T>(this.entityKey, id);
  }

  setHasNoMore(value: boolean) {
    this.hasNoMore = value;
  }

  getSnapshot(): ListSnapshot<T> {
    return {
      items: toJS(this.items),
      pageSize: this.pageSize,
      limit: this.limit,
      reversed: this.reversed,
      idAttribute: this.idAttribute,
    };
  }

  restoreFromSnapshot(snapshot: Partial<ListSnapshot<T>>) {
    if (!snapshot) {
      return;
    }

    this.isHydrated = true;
    this.pageSize = snapshot.pageSize ?? this.pageSize;
    this.limit = snapshot.limit ?? this.limit;
    this.reversed = snapshot.reversed ?? this.reversed;
    this.idAttribute = snapshot.idAttribute ?? this.idAttribute;

    if (Array.isArray(snapshot.items)) {
      this.items = [...snapshot.items];
    }
  }

  get list(): ListSnapshot<T> {
    return this.getSnapshot();
  }

  set list(snapshot: Partial<ListSnapshot<T>>) {
    this.restoreFromSnapshot(snapshot);
  }
}
