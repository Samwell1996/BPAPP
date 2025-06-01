import { useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useStores } from '@stores/hooks/useStores';

import Explore from './Explore';

const ExploreContainer = () => {
  const {
    posts: {
      fetchPosts,
      list: { getList },
      fetchMorePosts,
    },
  } = useStores();

  const getPosts = useCallback(() => {
    fetchPosts.run();
  }, []);

  const getMorePosts = useCallback(() => {
    if (fetchMorePosts.isLoading) {
      return;
    }
    fetchMorePosts.run();
  }, [fetchMorePosts.isLoading]);

  useEffect(() => {
    getPosts();
  }, []);

  const props = {
    isLoading: fetchPosts.isLoading,
    isLoadingMore: fetchMorePosts.isLoading,
    getMorePosts,
    onRefresh: getPosts,
    list: getList,
  };

  return <Explore {...props} />;
};

export default observer(ExploreContainer);
