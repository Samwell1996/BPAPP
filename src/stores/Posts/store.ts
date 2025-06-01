import { makeAutoObservable } from 'mobx';

import { POSTS } from '@stores/schemas';

import { PostModel } from './model';
import { ListStore } from '../helpers/createList';
import { withDuck } from '../helpers/duck';
import type { RootStore } from '../root';

const PAGE_LIMIT = 20;

export class PostsStore {
  list: ListStore<PostModel>;

  constructor(private root: RootStore) {
    this.list = new ListStore<PostModel>({
      entityKey: POSTS,
      root,
      limit: PAGE_LIMIT,
    });

    makeAutoObservable(this);
  }

  fetchPosts = withDuck<[options?: { force?: boolean }], void>(
    async options => {
      const force = options?.force ?? false;

      if (this.list.isHydrated && !force && !this.list.isEmpty) {
        return;
      }

      const response = await this.root.api.Posts.getPosts({
        _page: 1,
        _limit: PAGE_LIMIT,
      });

      this.list.set(response);
    },
  );

  fetchMorePosts = withDuck<[], void>(async _signal => {
    if (this.list.hasNoMore) {
      return;
    }

    const response = await this.root.api.Posts.getPosts({
      _page: this.list.pageNumber,
      _limit: this.list.limit,
    });

    this.list.append(response);
  });
}
