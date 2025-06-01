import { AxiosRequestConfig } from 'axios';

import { Api } from '@api/common';
import { PostModel } from '@stores/Posts/model';

import { ResponsePosts, IPosts } from './types';

class Posts extends Api {
  getPosts(data: IPosts) {
    return this.get<ResponsePosts, AxiosRequestConfig>('posts', {
      params: data,
    });
  }

  getPostById(id: string | undefined) {
    return this.get<PostModel>(`posts/${id}`);
  }
}

export default new Posts();
