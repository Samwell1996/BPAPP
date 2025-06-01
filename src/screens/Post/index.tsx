import { useCallback, useEffect, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { useNavigationParam } from '@hooks/navigation';
import { useStores } from '@stores/hooks/useStores';

import Post from './Post';

const _id = 'id';

const PostContainer = () => {
  const id = useNavigationParam(_id, undefined);

  const {
    posts: {
      fetchPostById,
      list: { findById },
    },
  } = useStores();

  const getPostsById = useCallback(() => {
    fetchPostById.run({ id });
  }, [id]);

  const post = useMemo(() => findById(id), [id]);

  useEffect(() => {
    getPostsById();
  }, []);

  const props = {
    post,
  };

  return <Post {...props} />;
};

export default observer(PostContainer);
