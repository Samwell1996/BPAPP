import { PostModel } from '@stores/Posts/model';

export interface IPosts {
  _page: number;
  _limit: number;
}

export type ResponsePosts = PostModel[];
