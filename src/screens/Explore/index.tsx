import { useCallback, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { SCREEN_NAMES } from '@constants/navigation';
import { usePreload } from '@hooks/navigation';
import { useStores } from '@stores/hooks/useStores';

import Explore from './Explore';

const preloadComponents = [SCREEN_NAMES.POST];

const ExploreContainer = () => {
  usePreload(preloadComponents);

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

  const onRefresh = useCallback(() => {
    fetchPosts.run({ force: true });
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
    onRefresh,
    list: getList,
  };

  return <Explore {...props} />;
};

export default observer(ExploreContainer);
