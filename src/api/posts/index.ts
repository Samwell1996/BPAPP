import { AxiosRequestConfig } from 'axios';

import { Api } from '@api/common';

import { ResponsePosts, IPosts } from './types';

class Posts extends Api {
  getPosts(data: IPosts) {
    return this.get<ResponsePosts, AxiosRequestConfig>('posts', {
      params: data,
    });
  }
}

export default new Posts();
