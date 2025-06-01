import { useCallback } from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';

import { SCREEN_NAMES } from '@constants/navigation';
import { useNavigation } from '@hooks/navigation';
import { PostModel } from '@stores/Posts/model';

import { useStyles } from './styles';

interface ExploreProps {
  isLoading: boolean;
  isLoadingMore: boolean;
  getMorePosts: () => void;
  onRefresh: () => void;
  list: PostModel[];
}

const PostsGrid = (props: ExploreProps) => {
  const styles = useStyles();
  const { navigate } = useNavigation();

  const renderItem = useCallback(
    ({ item }: { item: PostModel }) => (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => navigate(SCREEN_NAMES.POST, { id: item.id })}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const renderFooter = useCallback(
    () =>
      props.isLoadingMore ? (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
        </View>
      ) : null,
    [props.isLoadingMore],
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.isLoading}
          onRefresh={props.onRefresh}
        />
      }
      ListFooterComponent={renderFooter}
      data={props.list}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      onEndReached={props.getMorePosts}
      onEndReachedThreshold={0.3}
    />
  );
};

const Explore = (props: ExploreProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <PostsGrid {...props} />
    </View>
  );
};

export default Explore;
